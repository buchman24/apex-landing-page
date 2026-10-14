// app/page.tsx
import React from 'react';
import styles from './page.module.css'; // Import CSS Module
import type { Metadata } from 'next';
import { Logo } from '@/components/ui/logo';

// Update Metadata for this specific page
export const metadata: Metadata = {
  title: 'APEX Exercise: AI-Driven Network Segmentation Analysis',
  description: 'A comprehensive exercise simulating an AI/ML project for network analysis using AWS SageMaker and LLMs.',
};

export default function ApexExercisePage() {
  return (
    // Apply the container style from the CSS module
    <div className={styles.container}>
        <Logo size="lg" className="my-4" />
        <h1>Exercise: AI-Driven Network Segmentation Analysis</h1>
        

        <section id="intro">
            <h2>1. Introduction</h2>
            <p>Welcome! This exercise is designed to simulate a real-world AI/ML project, transforming developers into engineers capable of tackling complex data challenges end-to-end. You will work in teams to build a system that analyzes network configuration and traffic data to identify potentially risky segmentation setups using data engineering, machine learning (on AWS SageMaker), and analysis powered by LLMs.</p>
            <p>This exercise emphasizes practical application, AWS cloud services, MLOps principles, and critical thinking through research and evaluation. We included a dedicated research phase and offers both a standard path using managed AWS services and an optional advanced path for those wishing to explore self-hosted LLMs.</p>
            <blockquote>
                <p><em>"As I did the research for this book, I observed a pattern to my learning that reminded me of the way modern artificial neural networks learn: With each pass the algorithm makes through data, it learns more about the patterns that exist in that data. One pass may not be enough; nor ten; nor a hundred. Sometimes, neural networks learn over tens of thousands of iterations through the data."</em> - Anil Ananthaswamy, <em>Why Machines Learn</em></p>
            </blockquote>
            <p>This project will guide you through such an iterative process, applying AI techniques to a critical cybersecurity challenge.</p>
        </section>

        <section id="learning-objectives">
            <h2>2. Learning Objectives</h2>
            <p>Upon successful completion of this exercise, you will be able to:</p>
            <ul>
                <li><strong>Data Engineering:</strong> Ingest, clean, explore, and transform moderately complex datasets using Pandas and AWS S3. Implement domain-specific data joining logic (e.g., IP-to-segment mapping).</li>
                <li><strong>Research & Design:</strong> Utilize research tools (like Elicit, NotebookLM) and critical thinking to evaluate existing approaches and inform ML/AI system design choices.</li>
                <li><strong>Feature Engineering:</strong> Design and implement relevant features for a specific domain (network security), including generating text embeddings using libraries like Sentence Transformers.</li>
                <li><strong>Machine Learning (Unsupervised):</strong> Implement, train, and evaluate multiple unsupervised anomaly detection algorithms (e.g., Isolation Forest, KMeans) using Scikit-learn within AWS SageMaker.</li>
                <li><strong>Experiment Tracking (MLOps):</strong> Utilize tools like Weights & Biases (W&B) to track ML experiments, log parameters/metrics, and compare runs.
                    <blockquote><strong>MLOps (Machine Learning Operations):</strong> A set of practices combining ML, DevOps, and Data Engineering to deploy and maintain ML models reliably and efficiently.</blockquote>
                    <blockquote><strong>Experiment Tracking:</strong> The practice of recording all relevant information (code, data, configuration, results) for each ML experiment to ensure reproducibility and enable comparison.</blockquote>
                </li>
                <li><strong>LLM Integration:</strong>
                    <ul>
                        <li>(Standard Path) Interact effectively with managed LLM APIs (AWS Bedrock), including prompt engineering for analytical tasks.</li>
                        <li>(Advanced Path) Understand the concepts and challenges of loading, quantizing, serving, and interacting with self-hosted open-source LLMs on AWS infrastructure (SageMaker/EC2). Conceptualize <a href="/content/guides/LoRA">LoRA/qLoRA</a> fine-tuning.</li>
                    </ul>
                </li>
                <li><strong>Cloud Infrastructure (AWS):</strong> Utilize core AWS services pragmatically: S3 (storage), SageMaker (notebooks, training jobs - optional), Bedrock (managed LLMs), IAM (permissions), CloudWatch (logging), EC2 (GPU instances - advanced). Manage resources and understand cost implications.</li>
                <li><strong>Pipeline Development (MLOps):</strong> Build a reproducible end-to-end Python pipeline script using <code>boto3</code> to orchestrate data processing, ML inference, and LLM analysis. Implement basic parameterization and logging.
                    <blockquote><strong>Pipeline / Orchestration:</strong> Automating the sequence of steps in an ML workflow (e.g., data loading, processing, training, evaluation) into a single, executable process.</blockquote>
                    <blockquote><strong>Inference:</strong> Using a trained ML model to make predictions or classifications on new, unseen data.</blockquote>
                </li>
                <li><strong>Evaluation & Benchmarking:</strong> Develop and implement code-based evaluation strategies for unsupervised ML models and LLM outputs. Critically compare different approaches based on defined metrics and qualitative analysis.</li>
                <li><strong>Collaboration & Communication:</strong> Work effectively in a team using Git/GitHub, communicate technical concepts clearly, and document work comprehensively in a final report.</li>
            </ul>
        </section>

        {/* Apply projectTimeline style */}
        <section id="project-visualization">
            <h2>Project Workflow</h2>
            <p>This timeline provides a visual overview of the project phases, key activities, and the decision point between the Standard and Advanced paths.</p>

            {/* Apply projectTimeline style */}
            <div className={styles.projectTimeline}>

                {/* Apply timelineItem style */}
                <div className={styles.timelineItem}>
                    {/* Apply phaseNum style */}
                    <h4><a href="#phase0"><span className={styles.phaseNum}>0</span>Setup & Preparation</a></h4>
                    <div className="details">Focus: All | Est. Time: 3 hrs</div> {/* Note: details class is targeted within timelineItem in CSS */}
                    <p>AWS account/IAM setup, cost alerts, local development environment, Git repository, W&B login.</p>
                </div>

                {/* Apply timelineItem style */}
                <div className={styles.timelineItem}>
                    <h4><a href="#phase1"><span className={styles.phaseNum}>1</span>Data Ingestion & Exploration</a></h4>
                    <div className="details">Focus: Data Eng | Est. Time: 4 hrs</div>
                    <p>Set up SageMaker Notebook, load data from S3, perform EDA, map IPs to segments, clean data, save results to S3.</p>
                    <p><strong>Deliverable:</strong> Cleaned data (Parquet), <code>eda.ipynb</code>.</p>
                </div>

                {/* Apply timelineItem style */}
                <div className={styles.timelineItem}>
                     <h4><a href="#phase2"><span className={styles.phaseNum}>2</span>Research & Approach Design</a></h4>
                     <div className="details">Focus: All | Est. Time: 3 hrs</div>
                     <p>Brainstorm features/models/LLM use cases. Research existing methods using provided tools. Decide on initial technical approach.</p>
                     <p><strong>Deliverable:</strong> <code>research_summary.md</code>.</p>
                </div>

                {/* Apply timelineItem style */}
                <div className={styles.timelineItem}>
                     <h4><a href="#phase3"><span className={styles.phaseNum}>3</span>Feature Engineering & Embeddings</a></h4>
                     <div className="details">Focus: ML Eng | Est. Time: 5 hrs</div>
                     <p>Implement features based on research. Generate text embeddings. Assemble and scale the final feature set.</p>
                     <p><strong>Deliverable:</strong> Feature dataset (Parquet), <code>feature_engineering.ipynb/script</code>.</p>
                 </div>

                 {/* Apply timelineItem style */}
                 <div className={styles.timelineItem}>
                      <h4><a href="#phase4"><span className={styles.phaseNum}>4</span>ML Anomaly Detection</a></h4>
                      <div className="details">Focus: ML Eng | Est. Time: 7 hrs</div>
                      <p>Implement ≥2 unsupervised anomaly detection models (e.g., Isolation Forest, DBSCAN) in SageMaker. Integrate with W&B for experiment tracking. Train models and save anomaly scores.</p>
                      <p><strong>Deliverable:</strong> ML results (Parquet), <code>ml_modeling.ipynb/train.py</code>, W&B link.</p>
                 </div>

                {/* Apply timelineDecision style */}
                <div className={styles.timelineDecision}>
                    <strong>Decision Point: Choose LLM Path</strong>
                    <p>Select between using managed AWS Bedrock or a self-hosted LLM.</p>
                    {/* Apply timelinePaths style */}
                    <div className={styles.timelinePaths}>
                        {/* Apply timelinePath style */}
                        <div className={styles.timelinePath}>
                            <h5><a href="#phase5s"><span className={styles.phaseNum}>5S</span> Standard Path: Bedrock</a></h5>
                             <div className="details">Focus: LLM/AI Eng | Est. Time: 5 hrs</div>
                             <p>Integrate with AWS Bedrock API. Develop prompts. Analyze top anomalies using chosen Bedrock model. Save LLM analysis.</p>
                             <p><strong>Deliverable:</strong> <code>llm_analysis_bedrock.py</code>, results JSON.</p>
                        </div>
                        {/* Apply timelinePath style */}
                        <div className={styles.timelinePath}>
                             <h5><a href="#phase5a"><span className={styles.phaseNum}>5A</span> Advanced Path: Self-Hosted</a></h5>
                             <div className="details">Focus: LLM/AI Eng | Est. Time: +10-20 hrs</div>
                             <p>Set up GPU environment (SageMaker/EC2). Select, load (optional: quantize), and serve an open-source LLM (e.g., Llama 3 8B). Analyze anomalies.</p>
                             <p><strong>Deliverable:</strong> <code>self_hosted_llm.py</code>, results JSON, <code>README_Advanced.md</code>.</p>
                        </div>
                    </div>
                </div>

                 {/* Apply timelineConvergence style */}
                 <div className={styles.timelineConvergence}></div>

                 {/* Apply timelineItem style */}
                <div className={styles.timelineItem}>
                    <h4><a href="#phase6"><span className={styles.phaseNum}>6</span>Pipeline Integration & Orchestration</a></h4>
                    <div className="details">Focus: MLOps/Integrator | Est. Time: 5 hrs</div>
                    <p>Create <code>main.py</code> to automate steps 1-5. Use <code>argparse</code> for parameters (including LLM backend choice). Implement logging and error handling. Ensure reproducibility.</p>
                    <p><strong>Deliverable:</strong> <code>main.py</code>, updated <code>README.md</code>, <code>requirements.txt</code>.</p>
                </div>

                {/* Apply timelineItem style */}
                <div className={styles.timelineItem}>
                    <h4><a href="#phase7"><span className={styles.phaseNum}>7</span>Evaluation & Benchmarking</a></h4>
                    <div className="details">Focus: All | Est. Time: 4 hrs</div>
                    <p>Develop <code>evaluation.py</code>. Compare ML model performance (incl. calculating Precision/Recall/F1 against simulated truth). Compare LLM outputs (Bedrock vs. Self-hosted if applicable). Document findings.</p>
                     <p><strong>Deliverable:</strong> <code>evaluation.py/ipynb</code>, <code>evaluation_summary.md</code>.</p>
                </div>

                 {/* Apply timelineItem style */}
                 <div className={styles.timelineItem}>
                    <h4><a href="#deliverables"><span className={styles.phaseNum}>🏁</span>Final Deliverables & Submission</a></h4>
                    <div className="details">Focus: All</div>
                    <p>Write comprehensive final report (.md/.pdf). Ensure Git repository is complete, clean, and well-documented. Submit repository link.</p>
                 </div>

            </div>
        </section>

        <section id="roadmap">
            <h2>Roadmap & Estimated Time Commitment</h2>
            <p>This exercise is divided into several phases. The table below provides an estimated timeline and highlights the primary focus roles for each phase. Note that the total estimated times (~39 hours Standard, ~49-59+ hours Advanced) mentioned later include buffer time and final reporting not explicitly listed per phase below.</p>
            {/* Standard HTML table, styled by globals.css */}
            <table>
                {/* Table content as in HTML */}
                <thead>
                    <tr>
                        <th>Phase #</th>
                        <th>Title</th>
                        <th>Estimated Time (Standard Path)</th>
                        <th>Estimated Time (Advanced Path*)</th>
                        <th>Primary Focus Role(s)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="#phase0">0</a></td>
                        <td>Setup & Preparation</td>
                        <td>3 hours</td>
                        <td>3 hours</td>
                        <td>All</td>
                    </tr>
                    <tr>
                        <td><a href="#phase1">1</a></td>
                        <td>Data Ingestion & Exploration</td>
                        <td>4 hours</td>
                        <td>4 hours</td>
                        <td>Data Eng</td>
                    </tr>
                    <tr>
                        <td><a href="#phase2">2</a></td>
                        <td>Research & Approach Design</td>
                        <td>3 hours</td>
                        <td>3 hours</td>
                        <td>All</td>
                    </tr>
                    <tr>
                        <td><a href="#phase3">3</a></td>
                        <td>Feature Engineering & Embeddings</td>
                        <td>5 hours</td>
                        <td>5 hours</td>
                        <td>ML Eng</td>
                    </tr>
                    <tr>
                        <td><a href="#phase4">4</a></td>
                        <td>ML Anomaly Detection (SageMaker)</td>
                        <td>7 hours</td>
                        <td>7 hours</td>
                        <td>ML Eng</td>
                    </tr>
                    <tr>
                        <td><a href="#phase5s">5S</a></td>
                        <td>LLM Analysis (AWS Bedrock)</td>
                        <td>5 hours</td>
                        <td>-</td>
                        <td>LLM/AI Eng</td>
                    </tr>
                    <tr>
                        <td><a href="#phase5a">5A</a></td>
                        <td>Self-Hosted LLM Setup & Analysis</td>
                        <td>-</td>
                        <td>+10-20 hours</td>
                        <td>LLM/AI Eng</td>
                    </tr>
                    <tr>
                        <td><a href="#phase6">6</a></td>
                        <td>Pipeline Integration & Orchestration</td>
                        <td>5 hours</td>
                        <td>5 hours</td>
                        <td>MLOps / Integrator</td>
                    </tr>
                    <tr>
                        <td><a href="#phase7">7</a></td>
                        <td>Evaluation & Benchmarking</td>
                        <td>4 hours</td>
                        <td>4 hours</td>
                        <td>All</td>
                    </tr>
                    <tr>
                        <td><a href="#deliverables">🏁</a></td>
                        <td>Final Deliverables & Submission</td>
                        <td>3 hours</td>
                        <td>3 hours</td>
                        <td>All</td>
                    </tr>
                    <tr>
                        <td><strong>Total (Phases 0-🏁)</strong></td>
                        <td></td>
                        <td><strong>~39 hours</strong></td>
                        <td><strong>~49-59 hours</strong></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <p><em>*The Advanced Path replaces Phase 5S with 5A and adds significant extra time.</em></p>
        </section>

        <section id="paths">
             <h2>3. Exercise Paths & Duration</h2>
             <ul>
                 <li><strong>Standard Path (Recommended):</strong> Focuses on robust pipeline construction using managed AWS services (Bedrock for LLM).
                     <ul><li><strong>Estimated Time:</strong> ~39 hours per person over 2 weeks.</li></ul>
                 </li>
                 <li><strong>Advanced Path (Optional):</strong> Replaces Bedrock with a self-hosted LLM, potentially including quantization/LoRA. Requires significant extra effort, AWS infrastructure knowledge, and careful cost management. Choose only if your team is prepared for the additional challenge and time commitment.
                     <ul><li><strong>Estimated Time:</strong> Adds 10-20+ hours (Total: ~49-59+ hours).</li></ul>
                 </li>
             </ul>
         </section>

         <section id="team">
            <h2>4. Team Size & Roles</h2>
            <ul>
                <li><strong>Team Size:</strong> 3-4 members.</li>
                <li><strong>Focus Roles:</strong> Assign primary roles for deep dives, but collaboration and knowledge sharing across all areas are essential.
                    <ul>
                        <li><strong>Data Engineer Focus:</strong> Phase 1 (Data Ingestion/EDA), data cleaning utilities.</li>
                        <li><strong>ML Engineer Focus:</strong> Phase 3 (Feature Eng), Phase 4 (ML Modeling), W&B.</li>
                        <li><strong>LLM / AI Engineer Focus:</strong> Phase 2 (Research contribution), Phase 5S (Bedrock) OR Phase 5A (Self-Hosted LLM).</li>
                        <li><strong>MLOps / Integrator Focus:</strong> Phase 6 (Pipeline Script), Phase 7 (Evaluation Code Structure), overall reproducibility, <code>README.md</code>.</li>
                    </ul>
                </li>
            </ul>
        </section>

         <section id="problem">
            <h2>5. Core Problem</h2>
            <p>Analyze provided network segment configurations (<code>segments.csv</code>), connection rules (<code>connections.csv</code>), and sampled network traffic logs (<code>traffic_logs.csv</code>) to identify anomalous configurations or traffic patterns that might indicate security risks (e.g., enabling attacker lateral movement). This involves:</p>
            <ol>
                <li>Researching relevant approaches.</li>
                <li>Engineering meaningful features.</li>
                <li>Using unsupervised ML on AWS SageMaker to detect statistical anomalies.</li>
                <li>Leveraging an LLM (AWS Bedrock or Self-Hosted) to analyze the potential security implications of detected anomalies based on provided security principles.</li>
                <li>Building an automated pipeline to perform this analysis.</li>
                <li>Evaluating and benchmarking the effectiveness of your approach.</li>
            </ol>
        </section>

        <section id="resources">
            <h2>6. Provided Resources</h2>
            <p><strong>AWS Account Credits:</strong> You are responsible for monitoring and managing usage within the provided credits. Set up Billing Alerts!</p>
            <p><strong>S3 Bucket:</strong> Access to a specific S3 bucket URI: <code>s3://[Your S3 Bucket URI]/project-sentinel/</code> containing:</p>
            <ul>
                <li><code>data/segments.csv</code> (or .parquet)</li>
                <li><code>data/connections.csv</code> (or .parquet)</li>
                <li><code>data/traffic_logs.csv</code> (or .parquet)</li>
                <li><code>setup/project-sentinel-iam-policy.json</code> (Recommended minimum privilege IAM policy for your SageMaker role)</li>
            </ul>
            <p>You will be provided with datasets structured similarly to these examples:</p>

            <h4><code>segments.csv</code> (Describes Network Segments):</h4>
            <table>
              {/* Table content as in HTML */}
              <thead>
                 <tr>
                   <th>segment_id</th>
                   <th>ip_range</th>
                   <th>purpose</th>
                   <th>security_level</th>
                   <th>allowed_ingress_ports_protocols</th>
                   <th>allowed_egress_ports_protocols</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>DMZ-WEB-01</td>
                   <td>10.0.1.0/24</td>
                   <td>Public Web Servers</td>
                   <td>2</td>
                   <td>TCP:80, TCP:443</td>
                   <td>TCP:5432, TCP:8080</td>
                 </tr>
                 <tr>
                   <td>INTERNAL-DB-02</td>
                   <td>10.1.5.0/24</td>
                   <td>Core Database Cluster</td>
                   <td>5</td>
                   <td>TCP:5432</td>
                   <td></td>
                 </tr>
                 <tr>
                   <td>IOT-SENSOR-NET</td>
                   <td>192.168.100.0/24</td>
                   <td>Building Mgmt Sensors</td>
                   <td>1</td>
                   <td>UDP:161</td>
                   <td>UDP:514</td>
                 </tr>
                 <tr>
                   <td>DEV-APPS-05</td>
                   <td>10.2.10.0/23</td>
                   <td>Development Application Servers</td>
                   <td>3</td>
                   <td>TCP:22, TCP:8080</td>
                   <td>TCP:443, TCP:5432</td>
                 </tr>
               </tbody>
            </table>
            <blockquote>
                <strong>CIDR Notation (e.g., 10.0.1.0/24):</strong> A standard method for specifying IP address ranges. The number after the slash (<code>/24</code>) indicates how many bits define the network portion, determining the size of the range.<br /> {/* Use <br /> in JSX */}
                <strong>Ingress/Egress Ports:</strong> 'Ingress' refers to incoming traffic allowed <em>into</em> a segment (destination ports/protocols). 'Egress' refers to outgoing traffic allowed <em>out of</em> a segment (destination ports/protocols). {/* Use ' for apostrophe */}
            </blockquote>

             <h4><code>connections.csv</code> (Configured Allowed Connections):</h4>
             <table>
               {/* Table content as in HTML */}
               <thead>
                 <tr>
                   <th>connection_id</th>
                   <th>source_segment_id</th>
                   <th>target_segment_id</th>
                   <th>allowed_ports_protocols</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>CONN-001</td>
                   <td>DMZ-WEB-01</td>
                   <td>INTERNAL-DB-02</td>
                   <td>TCP:5432</td>
                 </tr>
                 <tr>
                   <td>CONN-002</td>
                   <td>DEV-APPS-05</td>
                   <td>INTERNAL-DB-02</td>
                   <td>TCP:5432</td>
                 </tr>
                 <tr>
                   <td>CONN-003</td>
                   <td>IOT-SENSOR-NET</td>
                   <td>DEV-APPS-05</td>
                   <td>UDP:514</td>
                 </tr>
                  <tr>
                   <td>CONN-004</td>
                   <td>DMZ-WEB-01</td>
                   <td>DEV-APPS-05</td>
                   <td>TCP:8080</td>
                 </tr>
               </tbody>
             </table>

            <h4><code>traffic_logs.csv</code> (Sampled/Aggregated Observed Traffic):</h4>
             <table>
               {/* Table content as in HTML */}
               <thead>
                 <tr>
                   <th>timestamp</th>
                   <th>source_ip</th>
                   <th>target_ip</th>
                   <th>port</th>
                   <th>protocol</th>
                   <th>bytes_sent</th>
                   <th>packets_sent</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>2024-07-16 10:00:00</td>
                   <td>10.0.1.55</td>
                   <td>10.1.5.10</td>
                   <td>5432</td>
                   <td>TCP</td>
                   <td>150234</td>
                   <td>1203</td>
                 </tr>
                 <tr>
                   <td>2024-07-16 10:01:00</td>
                   <td>10.0.1.60</td>
                   <td>198.51.100.1</td>
                   <td>80</td>
                   <td>TCP</td>
                   <td>5600</td>
                   <td>45</td>
                 </tr>
                 <tr>
                   <td>2024-07-16 10:02:00</td>
                   <td>192.168.100.10</td>
                   <td>10.2.10.200</td>
                   <td>514</td>
                   <td>UDP</td>
                   <td>12345</td>
                   <td>150</td>
                 </tr>
                 <tr>
                   <td>2024-07-16 10:03:00</td>
                   <td>10.2.10.50</td>
                   <td>10.1.5.12</td>
                   <td>5432</td>
                   <td>TCP</td>
                   <td>88901</td>
                   <td>750</td>
                 </tr>
                 <tr>
                   <td>2024-07-16 10:04:00</td>
                   <td>10.0.1.55</td>
                   <td>10.2.10.201</td>
                   <td>22</td>
                   <td>TCP</td>
                   <td>950</td>
                   <td>15</td>
                 </tr>
               </tbody>
             </table>
            <p><em>(Note: Actual data will have significantly more rows and potentially more complex variations)</em></p>

            <h4>Links for Research Phase:</h4>
            {/* Use standard anchor tags */}
            <ul>
                <li>Elicit: <a href="https://elicit.com/" target="_blank" rel="noopener noreferrer">https://elicit.com/</a></li>
                <li>NotebookLM: <a href="https://notebooklm.google.com/" target="_blank" rel="noopener noreferrer">https://notebooklm.google.com/</a></li>
                <li>Google Scholar: <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer">https://scholar.google.com/</a></li>
                <li>Semantic Scholar: <a href="https://www.semanticscholar.org/" target="_blank" rel="noopener noreferrer">https://www.semanticscholar.org/</a></li>
                <li>arXiv: <a href="https://arxiv.org/" target="_blank" rel="noopener noreferrer">https://arxiv.org/</a></li>
            </ul>
            <p>(Contextual links to Hugging Face, quantization libraries, serving frameworks will be provided within relevant Advanced Path sections)</p>
        </section>

         <section id="tech-stack">
             <h2>7. Technology Stack Summary</h2>
             <ul>
                 <li><strong>Core:</strong> Python, Pandas, NumPy, Scikit-learn, Git/GitHub, AWS CLI, <code>boto3</code></li>
                 <li><strong>AWS Services:</strong> S3, SageMaker (Notebook Instances), IAM, CloudWatch (Logs), Bedrock (Standard Path), EC2 (Optional, Advanced Path GPU Instances)
                     <blockquote><strong>AWS SageMaker:</strong> AWS's managed platform for the end-to-end ML lifecycle, providing tools for data labeling, building, training, tuning, deploying, and managing ML models. Includes hosted Jupyter notebooks.</blockquote>
                 </li>
                 <li><strong>ML/AI Libraries:</strong> Sentence Transformers, Weights & Biases (Recommended)
                     <blockquote><strong>Sentence Transformers:</strong> A Python library specifically designed for easily computing dense vector representations (embeddings) for sentences, paragraphs, and images.</blockquote>
                     <blockquote><strong>Weights & Biases (W&B):</strong> A popular third-party platform used for experiment tracking, dataset versioning, model management, and collaboration in ML projects.</blockquote>
                 </li>
                 <li><strong>Advanced Path Libraries (Optional):</strong> Transformers, Accelerate, <code>bitsandbytes</code>, <code>peft</code>, <code>trl</code> (for LoRA/qLoRA), <code>requests</code> (for Ollama), potentially <code>auto-gptq</code>, <code>optimum</code>.</li>
                 <li><strong>Research Tools:</strong> Elicit, NotebookLM, Google Scholar, etc.</li>
             </ul>
         </section>

        <section id="guide">
            <h2>8. Step-by-Step Guide</h2>

             {/* Apply phase style */}
             <div className={styles.phase} id="phase0">
                <h3>Phase 0: Setup & Preparation (Focus: All) (Estimated Time: 3 hours)</h3>
                <ol>
                    <li><strong>AWS Account & IAM Setup:</strong>
                        <ul>
                            <li>Log in, familiarize yourself with the Console (S3, SageMaker, Bedrock, IAM, CloudWatch, Billing).</li>
                            <li><strong>CRITICAL: Cost Control:</strong> Navigate to AWS Billing Dashboard, monitor costs frequently. Set up a budget alert.</li>
                            <li><strong>Create IAM Role:</strong>
                                <ul>
                                    <li>Go to IAM {'->'} Roles {'->'} Create Role. Use case: "AWS service", select "SageMaker". Next.</li>
                                    <li>Click "Attach policies directly". Click "Create policy". JSON tab.</li>
                                    <li>Copy content from provided <code>setup/project-sentinel-iam-policy.json</code> and paste it, replacing default.</li>
                                    <li>Review & create policy (e.g., <code>ProjectSentinelPolicy</code>).</li>
                                    <li>Go back to "Create role" tab. Refresh policy list. Search & select <code>ProjectSentinelPolicy</code>.</li>
                                    <li>Next. Name role (e.g., <code>SageMaker-ProjectSentinelRole-[YourTeamName]</code>). Create role.</li>
                                    <li>Note the ARN of this role.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><strong>Local Development Environment:</strong>
                        <ul>
                            <li>Install Python. Create/activate a virtual environment.</li>
                            <li>Install core libraries:
                                {/* Use standard pre/code blocks */}
                                <pre><code className="language-bash">pip install boto3 pandas numpy scikit-learn sagemaker "sentence-transformers{'>='}2.2.0" jupyterlab matplotlib seaborn ipaddress pyarrow wandb</code></pre>
                            </li>
                            <li>(Advanced Path Only): Install additional libraries later when needed.</li>
                            <li>Configure AWS CLI: <code>aws configure</code> (Use IAM User keys, NOT root keys).</li>
                            <li>Install Git.</li>
                        </ul>
                    </li>
                    <li><strong>Project Repository Setup:</strong>
                        <ul>
                            <li>Create/clone shared Git repo. Define branching strategy. Add <code>.gitignore</code>.</li>
                        </ul>
                    </li>
                    <li><strong>W&B Setup (Highly Recommended):</strong>
                        <ul>
                            <li>Create free account at <a href="https://wandb.ai/" target="_blank" rel="noopener noreferrer">https://wandb.ai/</a>.</li>
                            <li>Run <code>wandb login</code> in your local terminal and follow authentication steps.</li>
                        </ul>
                    </li>
                </ol>
            </div>

            {/* Apply phase style */}
             <div className={styles.phase} id="phase1">
                 <h3>Phase 1: Data Ingestion & Exploration (Focus: Data Eng) (Estimated Time: 4 hours)</h3>
                 <blockquote><strong>Data Ingestion:</strong> The process of obtaining, importing, and loading data from various sources into a storage system (like S3) or application for further processing and analysis.</blockquote>
                 <ol>
                     <li><strong>Setup SageMaker Notebook:</strong>
                         <ul>
                             <li>Create SageMaker Notebook Instance. Name: <code>sentinel-dev-[YourTeamName]</code>.</li>
                             <li>Instance type: Start with <code>ml.t3.medium</code> or <code>ml.t3.large</code>. <strong>Manage Costs!</strong></li>
                             <li>Permissions: Select the IAM role created in Phase 0.</li>
                             <li>Create & wait until <code>InService</code>. Open JupyterLab.</li>
                             {/* Apply warning style */}
                             <li><strong className={styles.warning}>COST WARNING: STOP your notebook instance via the SageMaker console when inactive!</strong></li>
                         </ul>
                     </li>
                     <li><strong>Access Data & Utilities:</strong>
                         <ul>
                             <li>In notebook, use <code>boto3</code> to load <code>segments.csv</code>, <code>connections.csv</code>, <code>traffic_logs.csv</code> into Pandas DataFrames. Sample <code>traffic_logs.csv</code> initially if very large.</li>
                             <li><strong>Memory Management for Large Datasets:</strong> For very large datasets (e.g., millions of rows in <code>traffic_logs.csv</code>), loading the entire file into memory using Pandas can cause crashes or performance issues, especially on resource-limited instances like <code>ml.t3.medium</code>. To handle this, use Pandas chunking with <code>pd.read_csv(..., chunksize=10000)</code> to process the data in smaller batches, or consider using <code>Dask</code>, a library designed for parallel computing and handling larger-than-memory datasets. Install Dask with <code>pip install dask[dataframe]</code> if needed, and refer to its documentation for DataFrame operations similar to Pandas.</li>
                         </ul>
                     </li>
                     <li><strong>Explore & Clean (EDA):</strong>
                         <ul>
                             <li>Perform EDA in <code>eda.ipynb</code>. Use <code>.info()</code>, <code>.describe()</code>, visualizations.
                                 <blockquote><strong>EDA (Exploratory Data Analysis):</strong> The crucial initial process of analyzing datasets to understand their main characteristics, discover patterns, spot anomalies, and check assumptions, often using statistical summaries and visualizations.</blockquote>
                             </li>
                             <li>Handle missing values, parse port/protocol lists.</li>
                         </ul>
                     </li>
                     <li><strong>IP Address to Segment Mapping:</strong>
                         <ul>
                             <li>Map <code>source_ip</code>/<code>target_ip</code> in <code>traffic_df</code> to <code>segment_id</code> using <code>segments_df</code>. Handle unmapped IPs. You will need to implement the logic for this mapping (e.g., using libraries like <code>ipaddress</code>).</li>
                         </ul>
                     </li>
                      <li><strong>Deliverable:</strong>
                         <ul>
                              <li>Cleaned DataFrames saved back to your team's S3 output prefix (<code>s3://[Your S3 Bucket URI]/project-sentinel/team-[YourTeamIdentifier]/output/cleaned_data/</code>) as Parquet files.
                                 <blockquote><strong>Parquet:</strong> A highly efficient, compressed, columnar storage file format optimized for complex data processing and analytics frameworks like Apache Spark and Pandas. It allows reading only necessary columns, saving time and resources.</blockquote>
                              </li>
                              <li><code>eda.ipynb</code> notebook documenting the process.</li>
                              <li>Commit notebook and scripts to Git.</li>
                         </ul>
                      </li>
                 </ol>
             </div>

             {/* Apply phase style */}
            <div className={styles.phase} id="phase2">
                 <h3>Phase 2: Research & Approach Design (Focus: All Team) (Estimated Time: 3 hours)</h3>
                  <ol>
                     <li><strong>Goal:</strong> Inform your technical approach before implementation.</li>
                     <li><strong>Brainstorm:</strong> Discuss initial ideas for feature engineering, ML models, and LLM use cases relevant to detecting risky segmentation.</li>
                     <li><strong>Research:</strong>
                         <ul>
                             <li>Define keywords (e.g., network anomaly detection machine learning, LLM security analysis).</li>
                             <li>Use Research Tools (Encouraged): Explore Elicit and NotebookLM (Discover Sources feature) with your keywords/questions.</li>
                             <li>Use Google Scholar, Semantic Scholar, etc. Focus on relevant papers/articles.</li>
                         </ul>
                     </li>
                     <li><strong>Synthesize & Plan:</strong>
                         <ul>
                             <li>Share key findings. Discuss promising features, ML algorithms (consider pros/cons for this data), and LLM prompting strategies inspired by research.</li>
                             <li>Make an <strong>initial, documented team decision</strong> on the primary features to build (Phase 3) and the ML models (≥2) to implement/compare (Phase 4). Draft an LLM interaction plan.</li>
                         </ul>
                     </li>
                     <li><strong>Deliverable:</strong>
                         <ul>
                             <li><code>research_summary.md</code> in Git outlining: research questions, tools used, summary of findings, initial justified plan for Phase 3 & 4, optional links to key resources.</li>
                         </ul>
                     </li>
                 </ol>
             </div>

             {/* Apply phase style */}
             <div className={styles.phase} id="phase3">
                 <h3>Phase 3: Feature Engineering & Embeddings (Focus: ML Eng) (Estimated Time: 5 hours)</h3>
                  <blockquote><strong>Feature Engineering:</strong> The process of using domain knowledge to select, transform, and create input variables (features) from raw data that make ML algorithms work better. This is a critical step that significantly impacts model performance.</blockquote>
                  <ol>
                     <li><strong>Load Cleaned Data:</strong> From your S3 output path.</li>
                     <li><strong>Implement Features:</strong> Create features based on your Phase 2 plan. Justify choices.</li>
                     <li><strong>Generate Embeddings:</strong> Use <code>sentence-transformers</code> (<code>all-MiniLM-L6-v2</code> recommended) for <code>segments.purpose</code> text.
                         <blockquote><strong>Embeddings (Text Embeddings):</strong> Numerical vectors representing text data (like words, sentences, or documents). Similar concepts or meanings are mapped to nearby points in the vector space, allowing ML models to understand semantic relationships in text.</blockquote>
                     </li>
                     <li><strong>Assemble Feature Set:</strong> Combine numerical, categorical (encode if needed), and embedding features. Handle scaling (<code>StandardScaler</code>).
                         <blockquote><strong>Scaling (e.g., StandardScaler):</strong> A preprocessing technique used to standardize the range of independent variables or features of data. <code>StandardScaler</code> transforms data to have a mean of 0 and a standard deviation of 1, which is often required or beneficial for certain ML algorithms.</blockquote>
                     </li>
                     <li><strong>Deliverable:</strong>
                         <ul>
                             <li><code>feature_engineering.ipynb</code> or script.</li>
                             <li>Final feature dataset saved to S3 (<code>features.parquet</code>).</li>
                             <li>Documentation linking features to research/rationale.</li>
                             <li>Commit to Git.</li>
                         </ul>
                     </li>
                 </ol>
             </div>

            {/* Apply phase style */}
            <div className={styles.phase} id="phase4">
                 <h3>Phase 4: ML Anomaly Detection (SageMaker) (Focus: ML Eng) (Estimated Time: 7 hours)</h3>
                 <blockquote><strong>Unsupervised Learning:</strong> A type of machine learning where the algorithm learns patterns from untagged data, without explicit labels or correct answers provided during training. The goal is often to discover hidden structures, group similar items, or identify outliers.</blockquote>
                 <blockquote><strong>Anomaly Detection:</strong> A specific unsupervised task focused on identifying data points, events, or observations that deviate significantly from the normal or expected behavior of a dataset. These outliers are often called anomalies.</blockquote>
                 <ol>
                     <li><strong>Algorithm Implementation:</strong> Implement <strong>at least two</strong> unsupervised algorithms chosen in Phase 2 (e.g., <code>IsolationForest</code>, <code>DBSCAN</code>).
                         <blockquote><strong>Isolation Forest:</strong> An unsupervised algorithm effective for anomaly detection. It works by randomly partitioning the data and explicitly isolating anomalies, which are typically easier to separate from the rest of the data points.</blockquote>
                         <blockquote><strong>DBSCAN:</strong> A density-based clustering algorithm that groups points in high-density areas into clusters and identifies points in low-density areas as outliers. It is well-suited for anomaly detection as it naturally flags points that do not belong to any cluster.</blockquote>
                     </li>
                     <li><strong>W&B Integration (Highly Recommended):</strong>
                         <pre><code className="language-python">
{`import wandb
wandb.init(project="project-sentinel-team-[YourTeamIdentifier]", config=hyperparameters, job_type='train')
# Log config, score distributions (wandb.Histogram), relevant metrics (e.g., silhouette score).
wandb.log({"silhouette_score": score, "anomaly_scores": wandb.Histogram(scores)})
wandb.finish()`}
                         </code></pre>
                         <blockquote><strong>Hyperparameters:</strong> Configuration settings for an ML algorithm that are set <em>before</em> training begins (unlike parameters learned <em>during</em> training). Examples include the number of trees in an Isolation Forest or the number of clusters (K) in KMeans. Tuning these is crucial for model performance.</blockquote>
                         <ul><li>Use the W&B dashboard to compare runs.</li></ul>
                     </li>
                     <li><strong>Train & Analyze (SageMaker Notebook Recommended Start):</strong>
                         <ul>
                             <li>Load features. Train models.</li>
                             <li>Visualize the score distributions for each model (e.g., using histograms via matplotlib/seaborn or wandb.Histogram). Document key observations about the shape, spread, and potential cut-off points for anomalies.</li>
                             <li>Based on the visualized distributions, identify and document potential thresholds for classifying anomalies for each model. Briefly discuss the trade-offs (e.g., catching more anomalies vs. more false alarms) associated with different threshold levels.</li>
                             <li>(Optional MLOps): Refactor into <code>train.py</code> for SageMaker Script Mode training jobs.</li>
                         </ul>
                     </li>
                     <li><strong>Save Results:</strong> Save results (IDs + scores per model) to S3 (e.g., <code>iforest_results.parquet</code>).</li>
                     <li><strong>Deliverable:</strong>
                         <ul>
                             <li><code>ml_modeling.ipynb</code> / <code>train.py</code>.</li>
                             <li>ML results on S3.</li>
                             <li>Generated plots of score distributions.</li>
                             <li>Notes/markdown section discussing potential thresholds and their trade-offs.</li>
                             <li>Link to W&B project (if used).</li>
                             <li>Commit to Git.</li>
                         </ul>
                     </li>
                 </ol>
             </div>

            {/* Apply decisionPoint style */}
            <div className={styles.decisionPoint}>
                 <strong>Decision Point: Choose Your LLM Path</strong><br />
                 Discuss within your team based on interest, time commitment, and comfort with infrastructure/cost management.<br />
                 Proceed to Phase 5S (Standard Path) or Phase 5A (Advanced Path).
             </div>

            {/* Apply phase style */}
            <div className={styles.phase} id="phase5s">
                 <h3>Phase 5S: LLM Analysis (AWS Bedrock) - Standard Path (Focus: LLM/AI Eng) (Estimated Time: 5 hours)</h3>
                 <ol>
                     <li><strong>Setup Bedrock Interaction:</strong> Use <code>boto3</code>. Choose model (start with <code>anthropic.claude-3-haiku...</code> for cost-effectiveness). Ensure IAM role permits <code>bedrock:InvokeModel</code>.</li>
                     <li><strong>Develop Prompt:</strong> Create a robust prompt template. Include context: anomaly details (ID, score, key features), clear analysis task (Explain Potential Risk, Suggest Investigation). Refine based on testing. Consider incorporating general security best practices into your prompt or analysis logic.</li>
                     <li><strong>Process Top Anomalies:</strong> Load chosen ML results (e.g., lowest Isolation Forest scores). For Top N: gather context, format prompt, call <code>bedrock_runtime.invoke_model</code>, parse response, handle errors (check CloudWatch), store analysis.</li>
                     <li><strong>Deliverable:</strong>
                         <ul>
                             <li><code>llm_analysis_bedrock.py</code> script.</li>
                             <li>Analysis results file on S3 (<code>bedrock_analysis_results.json</code> or similar).</li>
                             <li><code>prompt_engineering_notes.md</code>.</li>
                             <li>Commit to Git.</li>
                         </ul>
                     </li>
                 </ol>
                 <p><em>(Proceed to Phase 6 after completing Phase 5S)</em></p>
             </div>

            {/* Apply phase style */}
            <div className={styles.phase} id="phase5a">
                 <h3>Phase 5A: Self-Hosted LLM Setup & Analysis - Advanced Path (Focus: LLM/AI Eng) (Estimated Time: +10-20 hours EXTRA)</h3>
                 {/* Apply warning style */}
                 <div className={styles.warning}><strong>WARNING: High Complexity, Cost Risk (GPU Instances), Significant Troubleshooting Expected.</strong></div>
                 <p>This advanced path relies heavily on the PyTorch deep learning framework. Libraries mentioned like Hugging Face's `transformers`, `accelerate`, `bitsandbytes`, and `peft` (used for quantization or fine-tuning like qLoRA) primarily use PyTorch as their backend. When you load, quantize, serve, or fine-tune models using these tools, you are inherently working with PyTorch. You might interact with PyTorch tensors or model configurations directly, especially if doing custom inference or modifications.</p>
                 <p><strong>Important Note on GPU Memory Constraints:</strong> Models like Llama-3 8B require significant VRAM (e.g., ~16GB in FP16 format). Smaller GPU instances such as `ml.g4dn.xlarge` (16GB VRAM) may not accommodate these models without quantization. To ensure compatibility, we strongly recommend using quantization (e.g., 4-bit) to reduce memory requirements or testing with smaller models (e.g., 7B parameter variants like Mistral 7B Instruct) if memory issues arise. Minimum GPU memory requirement for an 8B model with quantization is approximately 12-14GB VRAM; for non-quantized models, aim for instances with at least 24GB VRAM (e.g., `ml.g5.2xlarge` or higher). Monitor memory usage during loading and inference to avoid out-of-memory errors.</p>
                 <ol>
                     <li><strong>Setup GPU Environment (Choose ONE):</strong>
                         <ul>
                             <li>A) SageMaker Notebook GPU Instance (Recommended for simplicity within AWS): Change instance type (e.g., <code>ml.g4dn.xlarge</code>). <strong>STOP WHEN DONE!</strong></li>
                             <li>B) EC2 GPU Instance: Launch (e.g., <code>g4dn/g5</code>) with Deep Learning AMI or manual driver/CUDA setup. Manage SSH, security groups. <strong>STOP WHEN DONE!</strong></li>
                             <li>Install Advanced Path libraries (Transformers, <code>bitsandbytes</code>, etc., ensuring CUDA compatibility).</li>
                         </ul>
                     </li>
                     <li><strong>Model Selection:</strong> Choose small/medium open-source instruction-tuned model (e.g., Llama-3 8B Instruct, Mistral 7B Instruct). Consider smaller models if GPU memory is limited.</li>
                     <li><strong>Loading Strategy (Choose ONE, implement in script):</strong>
                         <ul>
                             <li>A) Standard Load (FP16/BF16): Use <code>transformers AutoModelForCausalLM.from_pretrained(..., torch_dtype=..., device_map="auto")</code>. Note that this requires higher VRAM (e.g., 16GB+ for 8B models).</li>
                             <li>B) Quantized Load (4-bit Recommended): Use <code>transformers</code> with <code>BitsAndBytesConfig(load_in_4bit=True, ...)</code> and <code>device_map="auto"</code>. Explain concept of quantization (precision reduction for efficiency) vs. trade-off (minor accuracy loss) in notes. This is strongly recommended for instances with 16GB or less VRAM.</li>
                         </ul>
                     </li>
                      <li><strong>Inference/Serving Strategy (Choose ONE):</strong>
                         <ul>
                             <li>A) Direct Script Inference: Use loaded <code>model.generate(...)</code> within your Python script. Requires careful prompt formatting for the specific model.</li>
                             <li>B) Ollama Server (Easier Serving): Install Ollama on GPU instance, <code>ollama pull {'<model_tag>'}</code>, run server, use <code>requests</code> library from Python script to call <code>http://localhost:11434/api/generate</code>.</li>
                         </ul>
                     </li>
                     <li><strong>(Highly Optional) LoRA/qLoRA Fine-tuning Attempt:</strong>
                          <p>This involves adapting the chosen pre-trained model to better suit the specific task using Parameter-Efficient Fine-Tuning (PEFT) techniques like LoRA or its quantized version, qLoRA.</p>
                          <div className={styles.warning} style={{padding: '0.5em 1em', margin: '1em 0'}}> {/* Inline style for specific adjustment */}
                              <strong>Prerequisites:</strong> Only attempt if experienced with LLM fine-tuning concepts and if significant extra time and compute resources are available. Heavy documentation is required.
                          </div>
                          <p><strong>Key Requirements:</strong></p>
                          <ul>
                              <li><strong>Synthetic Dataset Creation:</strong> You must design and create a suitable instruction-following dataset tailored to network security analysis (this dataset is NOT provided).</li>
                              <li><strong>Training Implementation:</strong> Utilize libraries like Hugging Face's <code>trl</code> (specifically the <code>SFTTrainer</code>) for supervised fine-tuning.</li>
                              <li><strong>Compute Resources:</strong> Requires substantial GPU time and memory.</li>
                              <li><strong>Evaluation:</strong> Assess the impact of fine-tuning compared to the base model.</li>
                          </ul>
                      </li>
                     <li><strong>Process Top Anomalies:</strong> Adapt code to use chosen self-hosted inference method. Ensure correct model-specific prompt formatting. Store analysis.</li>
                     <li><strong>Deliverable (Advanced Path):</strong>
                         <ul>
                             <li>Python scripts for setup/inference (<code>self_hosted_llm.py</code> / <code>llm_analysis_selfhosted.py</code>).</li>
                             <li>(If fine-tuning) Training script, dataset notes, adapter files (optional).</li>
                             <li>Analysis results file on S3 (<code>selfhosted_analysis_results.json</code>).</li>
                             <li><strong>Crucial:</strong> <code>README_Advanced.md</code> detailing exact setup steps, model/quantization/serving choices, challenges faced, justification, and estimated GPU instance hours used.</li>
                             <li>Commit all to Git.</li>
                         </ul>
                     </li>
                 </ol>
                  <p><em>(Proceed to Phase 6 after completing Phase 5A)</em></p>
             </div>

            {/* Apply phase style */}
            <div className={styles.phase} id="phase6">
                  <h3>Phase 6: Pipeline Integration & Orchestration (Focus: MLOps / Integrator) (Estimated Time: 5 hours)</h3>
                  <ol>
                     <li><strong>Create <code>main.py</code>:</strong> Orchestrate phases 1-5 using Python functions/modules.
                         <ul>
                             <li>Use <code>argparse</code> for inputs (S3 paths), outputs, parameters, and crucially <code>--llm-backend {'{bedrock|selfhosted}'}</code>.</li> {/* Use {'{...}'} for braces */}
                             <li>Use <code>logging</code> for progress tracking. Use <code>boto3</code> for AWS interactions.</li>
                             <li>Implement conditional logic based on <code>--llm-backend</code> to call correct Phase 5 functions.</li>
                             <li>Handle potential errors gracefully.</li>
                         </ul>
                     </li>
                     <li><strong>Reproducibility:</strong> Create/update <code>requirements.txt</code>. Ensure <code>README.md</code> has clear instructions to run the pipeline for both backends.
                         <blockquote><strong>Reproducibility:</strong> In ML/Data Science, this means ensuring that an experiment or analysis can be run again by someone else (or yourself later) using the same code, data, and environment, achieving the exact same results. <code>requirements.txt</code> is a key component for environment reproducibility.</blockquote>
                     </li>
                     <li><strong>Deliverable:</strong>
                         <ul>
                             <li>Final <code>main.py</code> script.</li>
                             <li>Updated <code>requirements.txt</code>, <code>README.md</code>.</li>
                             <li>Commit to Git.</li>
                         </ul>
                     </li>
                 </ol>
             </div>

            {/* Apply phase style */}
            <div className={styles.phase} id="phase7">
                 <h3>Phase 7: Evaluation & Benchmarking (Focus: All) (Estimated Time: 4 hours)</h3>
                 <p>Recall from Chapter 4 the importance of evaluation pipelines. This phase involves creating yours, starting with comparing the ML models based on their anomaly scores and your defined criteria.</p>
                 <ol>
                     <li><strong>Student-Written Evaluation Code (<code>evaluation.py</code> / <code>evaluation.ipynb</code>):</strong>
                         <ul>
                             <li><strong>Requirement:</strong> Write code to load ML & LLM results and automate comparisons.</li>
                             <li>Load results for {'>='}2 ML models. Generate comparative plots (e.g., score histograms). Calculate anomaly-specific metrics (e.g., ROC-AUC if pseudo-labels are available, or other relevant metrics like Area Under the Precision-Recall Curve (PR-AUC)) alongside traditional clustering metrics if applicable. Ensure that the chosen metrics align with the goal of anomaly detection rather than just cluster quality.
                                 <blockquote><strong>Metrics (ML Evaluation):</strong> Quantitative measures used to assess the performance and effectiveness of a machine learning model. For anomaly detection, metrics like ROC-AUC (Receiver Operating Characteristic - Area Under Curve) and PR-AUC (Precision-Recall - Area Under Curve) are often more appropriate as they evaluate the model's ability to distinguish anomalies from normal instances, especially when pseudo-labels or simulated ground truth are available.</blockquote>
                             </li>
                              <li>Load LLM analysis results.</li>
                              <li><strong>ML Models:</strong> MANDATORY comparison using evaluation code outputs and qualitative review. Justify which ML model performed better overall for this task, considering not only the anomaly-specific metrics like ROC-AUC or PR-AUC but also the characteristics of its score distribution and the appropriateness of the chosen threshold, referencing Phase 2 research.
                                 <ul>
                                      <li><strong>Requirement:</strong> Although this is unsupervised learning, if you define a threshold to classify instances as "anomalous" vs. "normal" (even if based on score percentiles), you <strong>must</strong> explicitly state the chosen threshold for each ML model being evaluated and calculate and report <strong>Precision, Recall, and F1-Score</strong> against a <em>hypothetical</em> or <em>simulated</em> ground truth (or justify why these are not applicable/how you are evaluating classification performance otherwise).<sup>*</sup> Crucially, justify your chosen threshold(s) by referencing the score distribution analysis performed in Phase 4. Explain why this threshold was deemed appropriate for the simulated ground truth evaluation. Additionally, if possible, report anomaly-specific metrics such as ROC-AUC or PR-AUC to better assess the model's ability to detect anomalies, explaining how these metrics align with the project goal of identifying risky network segmentation setups.
                                         <blockquote><strong>Ground Truth:</strong> The factual, correct labels or values for the data against which model predictions are compared for evaluation. In unsupervised learning, ground truth is often unavailable, so it might be simulated or based on expert labels for a subset of data if evaluating pseudo-classification performance.</blockquote>
                                          <ul>
                                              <li><strong>Precision:</strong> Of all instances flagged as anomalous, what fraction *actually are* anomalous? (TP / (TP + FP)) - Measures the accuracy of positive predictions. High precision means fewer false alarms.</li>
                                              <li><strong>Recall (Sensitivity):</strong> Of all *truly* anomalous instances, what fraction did the model correctly identify? (TP / (TP + FN)) - Measures the model's ability to find all relevant instances. High recall means fewer missed anomalies.</li>
                                              <li><strong>F1-Score:</strong> The harmonic mean of Precision and Recall (2 * (Precision * Recall) / (Precision + Recall)) - Provides a single score balancing both concerns, useful when both false positives and false negatives are costly.</li>
                                         </ul>
                                          <blockquote><strong>TP / FP / FN (True Positives, False Positives, False Negatives):</strong> Core terms in classification evaluation: <br />
                                           - <strong>TP:</strong> Correctly identified positive (anomalous) instance.<br />
                                           - <strong>FP:</strong> Incorrectly identified positive instance (normal flagged as anomalous - Type I Error).<br />
                                           - <strong>FN:</strong> Missed positive instance (anomalous flagged as normal - Type II Error).<br />
                                         You will need to define how these apply in your *simulated* ground truth context.</blockquote>
                                     </li>
                                 </ul>
                              </li>
                             <li><strong>LLM Analysis:</strong> Use rubric scores (from eval code) for ~10-15 outputs. Compare Bedrock vs. Self-hosted / Quantized vs. Non-Quantized if applicable (Quality, perceived Latency).</li>
                         </ul>
                     </li>
                      <li><strong>Deliverable:</strong>
                         <ul>
                             <li><code>evaluation.py</code> script or <code>evaluation.ipynb</code> notebook.</li>
                             <li><code>evaluation_summary.md</code> detailing benchmark setup, results (include generated plots/tables), a dedicated subsection titled 'ML Model Threshold Selection and Justification' detailing the chosen thresholds and the rationale based on Phase 4's distribution analysis, alongside the calculated Precision/Recall/F1 scores and anomaly-specific metrics like ROC-AUC or PR-AUC, rubric scoring methodology/results, LLM-as-judge findings (if done), and qualitative comparisons/conclusions.</li>
                             <li>Commit code and summary to Git.</li>
                         </ul>
                     </li>
                 </ol>
                 <p><small><sup>*</sup>For this exercise, 'simulated ground truth' could involve, for example, defining the bottom X% of scores from one model as 'true anomalies' and evaluating how well other models (or the same model with different parameters) identify these using their respective thresholds.</small></p>
             </div>
         </section>


        <section id="deliverables">
            <h2>9. Final Deliverables</h2>
            <ol>
                <li><strong>Write Final Report (.md or .pdf):</strong> Structure clearly:
                    <ul>
                        <li>Introduction (Problem, Goals, Team Roles, Chosen LLM Path)</li>
                        <li>Research Summary (Phase 2 Findings & Impact)</li>
                        <li>Data Engineering (Process, Challenges)</li>
                        <li>Feature Engineering (Features, Justification, Embeddings)</li>
                        <li>ML Anomaly Detection (Models Used, W&B Insights, Key Findings)</li>
                        <li>LLM Analysis (Prompt Design, Backend Details - Bedrock/Self-Hosted, Example Outputs)</li>
                        <li>Pipeline Architecture (<code>main.py</code> description, AWS services used)</li>
                        <li>Evaluation & Benchmarking (Methodology from Phase 7, Results, Comparisons, Conclusions)</li>
                        <li>Challenges & Learnings (Technical hurdles, cost management, teamwork)</li>
                        <li>Individual Contributions (Briefly outline each member's primary contributions)</li>
                        <li>Conclusion & Future Work</li>
                        <li>(If Advanced Path) Appendix: Detailed Self-Hosting Setup & Costs (<code>README_Advanced.md</code> can be referenced/included)</li>
                    </ul>
                </li>
                <li><strong>Code & Submission:</strong>
                    <ul>
                        <li>Ensure Git repository is final, clean, well-organized.</li>
                        <li>Include all code (<code>main.py</code>, <code>evaluation.py</code>, helpers, modules, notebooks), configuration, <code>README.md</code>, <code>research_summary.md</code>, <code>evaluation_summary.md</code>, final report, and <code>requirements.txt</code>.</li>
                        <li>The main <code>README.md</code> should be the entry point, explaining the project structure, setup, and how to run the pipeline (both LLM backend options).</li>
                        <li>Submit the Git repository link to the APEX team.</li>
                    </ul>
                </li>
             </ol>
             <h4>Advanced Path Deliverables List (Included Above):</h4>
                 <ul>
                    <li><code>llm_analysis_selfhosted.py</code></li>
                    <li><code>selfhosted_analysis_results.json</code></li>
                    <li><code>prompt_engineering_notes.md</code></li>
                    <li><code>research_summary.md</code></li>
                    <li><code>feature_engineering.ipynb</code></li>
                    <li><code>ml_modeling.ipynb</code></li>
                    <li><code>eda.ipynb</code></li>
                    <li><code>main.py</code></li>
                    <li><code>evaluation.py</code> or <code>evaluation.ipynb</code></li>
                    <li><code>requirements.txt</code></li>
                    <li><code>README.md</code></li>
                    <li><code>README_Advanced.md</code> (mentioned in Final Report section)</li>
                 </ul>
        </section>

        <section id="further-reading">
            <h2>11. Further Reading</h2>
            <p>Explore these additional resources for deeper insights into related topics:</p>
            <ul>
                <li>
                    <a href="https://arxiv.org/pdf/2502.04227" target="_blank" rel="noopener noreferrer">
                        Large Language Models for Network Intrusion Detection (arXiv:2502.04227)
                    </a> - Research paper exploring LLM capabilities for detecting network intrusions.
                </li>
                <li>
                    <a href="https://arxiv.org/pdf/2409.11276" target="_blank" rel="noopener noreferrer">
                        Evaluating LLMs for Network Traffic Analysis (arXiv:2409.11276)
                    </a> - Research paper evaluating the performance of LLMs on network traffic analysis tasks.
                </li>
                <li>
                    <a href="https://cybersecurity.springeropen.com/articles/10.1186/s42400-025-00361-w" target="_blank" rel="noopener noreferrer">
                        Cybersecurity Journal Article on Network Security Analysis
                    </a> - Discusses machine learning approaches for network security analysis (SpringerOpen).
                </li>
                <li>
                    <a href="https://github.com/guanwei49/LogLLM" target="_blank" rel="noopener noreferrer">
                        LogLLM: LLMs for Log Analysis (GitHub Repository)
                    </a> - A project demonstrating the use of Large Language Models for log understanding and analysis.
                </li>
            </ul>
        </section>

        <section id="conclusion">
            <h2>12. Conclusion</h2>
            <p>Congratulations! You've completed the APEX Exercise. This project has provided you with a comprehensive experience in data engineering, machine learning, and large language model integration. You've learned to:</p>
            <ul>
                <li>Ingest and explore data.</li>
                <li>Engineer meaningful features.</li>
                <li>Implement unsupervised ML algorithms.</li>
                <li>Leverage LLMs for security analysis.</li>
                <li>Build a reproducible pipeline.</li>
                <li>Evaluate and benchmark your approach.</li>
            </ul>
            <p>This exercise has equipped you with the skills to tackle complex data challenges end-to-end. Keep practicing, and you'll continue to grow your data science and AI capabilities.</p>
        </section>

        <section id="next-steps">
            <h2>13. Next Steps</h2>
            <p>Good luck! We hope you find this a challenging and rewarding learning experience.</p>
        </section>

    </div> // End of container div
  );
}
