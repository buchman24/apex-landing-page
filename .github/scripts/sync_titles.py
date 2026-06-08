#!/usr/bin/env python3
"""Sync APEX community member job titles from Dex CRM to data/members.ts"""

import requests
import re
import os
import sys

DEX_API_KEY = os.environ['DEX_API_KEY']
FILE_PATH = 'data/members.ts'


def normalize_linkedin_url(url):
    if not url:
        return None
    url = url.strip().lower()
    url = url.replace('https://', '').replace('http://', '').replace('www.', '')
    url = url.rstrip('/')
    if 'linkedin.com/in/' in url:
        parts = url.split('linkedin.com/in/')
        if len(parts) > 1:
            return 'linkedin.com/in/' + parts[1].split('/')[0].split('?')[0]
    return url


def fetch_dex_contacts():
    contacts = []
    cursor = None
    headers = {'Authorization': f'Bearer {DEX_API_KEY}'}
    while True:
        params = {'take': 100}
        if cursor:
            params['cursor'] = cursor
        resp = requests.get(
            'https://api.prod.getdex.com/v2/contacts/',
            headers=headers,
            params=params
        )
        resp.raise_for_status()
        data = resp.json()['data']
        contacts.extend(data['contacts'])
        cursor = data['pagination'].get('nextCursor')
        if not cursor:
            break
    return contacts


def build_linkedin_map(contacts):
    mapping = {}
    for c in contacts:
        linkedin = c.get('linkedin')
        job_title = c.get('job_title')
        company = c.get('company')
        if linkedin and job_title:
            normalized = normalize_linkedin_url(linkedin)
            if normalized:
                if company and 'at ' not in job_title.lower():
                    title = f"{job_title} at {company}"
                else:
                    title = job_title
                mapping[normalized] = title
    return mapping


def main():
    print("Fetching Dex contacts...")
    contacts = fetch_dex_contacts()
    print(f"Found {len(contacts)} contacts")

    linkedin_map = build_linkedin_map(contacts)
    print(f"Mapped {len(linkedin_map)} LinkedIn profiles")

    with open(FILE_PATH, 'r') as f:
        content = f.read()

    changes = []
    lines = content.split('\n')
    updated_lines = []

    for line in lines:
        desc_match = re.search(r'description:\s*"([^"]*)"', line)
        linkedin_match = re.search(r'linkedinUrl:\s*"([^"]*)"', line)

        if desc_match and linkedin_match:
            old_desc = desc_match.group(1)
            linkedin_url = linkedin_match.group(1)
            normalized = normalize_linkedin_url(linkedin_url)
            new_title = linkedin_map.get(normalized)

            if new_title and new_title != old_desc:
                changes.append({
                    'url': linkedin_url,
                    'old': old_desc,
                    'new': new_title
                })
                line = line[:desc_match.start(1)] + new_title + line[desc_match.end(1):]

        updated_lines.append(line)

    if not changes:
        print("No title changes detected.")
        return

    print(f"\n{len(changes)} title update(s):")
    for c in changes:
        print(f"  * {c['old']}  ->  {c['new']}")
        print(f"    ({c['url']})")

    with open(FILE_PATH, 'w') as f:
        f.write('\n'.join(updated_lines))

    print(f"\nUpdated {FILE_PATH}")


if __name__ == '__main__':
    main()
