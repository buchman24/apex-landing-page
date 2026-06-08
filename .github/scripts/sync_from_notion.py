#!/usr/bin/env python3
"""Read Pending rows from Notion 'Community Members - New Additions' DB
and insert them into the communityMembers array in data/members.ts."""

import requests
import re
import os
import json

NOTION_TOKEN = os.environ['NOTION_TOKEN']
DATABASE_ID = 'd466fc6cbbbd445baad746abc5c5d052'
FILE_PATH = 'data/members.ts'

NOTION_HEADERS = {
    'Authorization': f'Bearer {NOTION_TOKEN}',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
}


def fetch_pending_members():
    resp = requests.post(
        f'https://api.notion.com/v1/databases/{DATABASE_ID}/query',
        headers=NOTION_HEADERS,
        json={
            'filter': {
                'property': 'Status',
                'select': {'equals': 'Pending'}
            }
        }
    )
    resp.raise_for_status()
    return resp.json().get('results', [])


def extract_member(page):
    props = page['properties']

    def text(prop):
        items = props.get(prop, {}).get('rich_text', [])
        return items[0]['plain_text'].strip() if items else ''

    def url(prop):
        return (props.get(prop, {}).get('url') or '').strip()

    def title(prop):
        items = props.get(prop, {}).get('title', [])
        return items[0]['plain_text'].strip() if items else ''

    name = title('Name')
    linkedin = url('LinkedIn URL')
    job_title = text('Job Title')
    photo = url('Photo URL') or '/team/placeholder.png'

    # Generate a simple ID from name
    member_id = re.sub(r'[^a-z0-9]', '_', name.lower())[:12].strip('_')

    return {
        'id': member_id,
        'name': name,
        'description': job_title,
        'imageSrc': photo,
        'linkedinUrl': linkedin,
        'page_id': page['id']
    }


def mark_as_added(page_id):
    requests.patch(
        f'https://api.notion.com/v1/pages/{page_id}',
        headers=NOTION_HEADERS,
        json={
            'properties': {
                'Status': {'select': {'name': 'Added'}}
            }
        }
    ).raise_for_status()


def insert_into_members_ts(members_to_add):
    with open(FILE_PATH, 'r') as f:
        content = f.read()

    # Find the end of the communityMembers array (closing ];)
    # We insert new members just before the closing ];
    marker = 'export const allMembers'
    idx = content.find(marker)
    if idx == -1:
        raise ValueError('Could not find insertion point in members.ts')

    # Find the last ]; before allMembers
    closing = content.rfind('];', 0, idx)
    if closing == -1:
        raise ValueError('Could not find communityMembers closing ];')

    new_entries = ''
    for m in members_to_add:
        new_entries += (
            f'  {{ id: "{m["id"]}", name: "{m["name"]}", '
            f'description: "{m["description"]}", '
            f'imageSrc: "{m["imageSrc"]}", '
            f'linkedinUrl: "{m["linkedinUrl"]}" }},\n'
        )

    updated = content[:closing] + new_entries + content[closing:]

    with open(FILE_PATH, 'w') as f:
        f.write(updated)


def main():
    print('Fetching pending members from Notion...')
    pages = fetch_pending_members()

    if not pages:
        print('No pending members found.')
        return

    members = [extract_member(p) for p in pages]
    valid = [m for m in members if m['name'] and m['linkedinUrl']]

    if not valid:
        print('No valid members (missing name or LinkedIn URL).')
        return

    print(f'Adding {len(valid)} member(s):')
    for m in valid:
        print(f'  + {m["name"]} — {m["description"]}')

    insert_into_members_ts(valid)

    for m in valid:
        mark_as_added(m['page_id'])
        print(f'  Marked as Added in Notion: {m["name"]}')

    print(f'\nDone. Updated {FILE_PATH}')


if __name__ == '__main__':
    main()
