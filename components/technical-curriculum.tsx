import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Network, 
  Cpu, 
  Settings, 
  Search, 
  Code2, 
  Gauge, 
  Sparkles,
  GraduationCap,
  Rocket,
  BookOpen,
  Lightbulb,
  FileText,
  Trophy,
  Book
} from "lucide-react"
import NextImage from "next/image"

interface Lecture {
  id: string
  title: string
  description: string
  topics: string[]
  lecturer?: string
  icon?: React.ReactNode
  techLogos?: string[]
  level?: "beginner" | "intermediate" | "advanced"
}

const preMaterials = {
  id: "pre-materials",
  title: "Pre-Course Assignment",
  description: "Foundational math, deep learning intuition, hands-on LLM building (Micrograd to GPT), and academic theory to prepare for the program.",
  topics: [
    "Linear Algebra (Matrices, Transpose, Vectors), Calculus (Derivatives, Chain Rule, Gradient Descent), Probability (Distributions, Expectations, Variance)",
    "Neural Network fundamentals (Neurons, Layers, Backpropagation)",
    "Building LLMs from scratch (Micrograd, Makemore, WaveNet, GPT, Tokenizer) with practical exercises",
    "Overview of DL Architectures (Transformers, CNNs, RNNs) & Research Paper Analysis",
  ],
  icon: <Book className="w-6 h-6" />,
  level: "beginner",
  techLogos: [
    "https://cdn.brandfetch.io/python.org/w/400/h/400?c=1idjQoo38323pC02ZXr",
    "https://cdn.brandfetch.io/pytorch.org/w/400/h/400?c=1idjQoo38323pC02ZXr",
  ]
}

const lectures: Lecture[] = [
  {
    id: "lecture-1",
    title: "AI Through the Ages",
    description: "An overview of AI's evolution, from Traditional ML to Deep Learning to Generative AI, and where it's heading.",
    topics: [
      "History of AI: from Traditional ML (rule-based, expert systems) to Deep Learning (CNN, RNN, VAE) to Generative AI (GANs, Diffusion Models, GPTs)",
      "Training dimensions (pre, post, test-time)",
      "AI's scaling laws and optimality (e.g. Chinchilla paper)",
      "Challenges of scaling AI",
      "The future of foundation models research",
    ],
    lecturer: "Dr. Idan Schwartz (BIU)",
    icon: <Brain className="w-6 h-6" />,
    level: "beginner",
    techLogos: [
      "https://cdn.brandfetch.io/openai.com/w/400/h/400?c=1idjQoo38323pC02ZXr",
      "https://cdn.brandfetch.io/anthropic.com/w/400/h/400?c=1idjQoo38323pC02ZXr",
      "https://cdn.brandfetch.io/pytorch.org/w/400/h/400?c=1idjQoo38323pC02ZXr",
      "https://cdn.brandfetch.io/tensorflow.org/w/400/h/400?c=1idjQoo38323pC02ZXr"
    ]
  },
  {
    id: "lecture-2",
    title: "Transformer Fundamentals",
    description: "A deep-dive into the Transformer architecture and modern LLMs.",
    topics: [
      "Encoder-Decoder structures",
      "Tokenizer, Embeddings and Positional Encoding",
      "Attention (MHA, MQA, GQA, MLA) and QKV matrices",
      "Advanced architectures: Sparse Attention, MOE, Multi-modal",
      "Case study: the numbers behind GPT-3",
    ],
    lecturer: "Dr. Roy Nissim (Red Hat)",
    icon: <Network className="w-6 h-6" />,
    level: "intermediate",
    techLogos: [
      "https://cdn.brandfetch.io/huggingface.co/w/400/h/400?c=1idjQoo38323pC02ZXr",
    ]
  },
  {
    id: "lecture-3",
    title: "Pre-Training: Building an LLM from Scratch",
    description: "An E2E walkthrough on the work and challenges of training a foundation model.",
    topics: [
      "What it really takes to train a foundation model",
      "Data collection and curation",
      "Hardware setup and training parallelization",
      "Tracking progress and checkpointing",
      "Lessons from the process",
      "Team structure and processes",
      "Case study: Real examples with numbers (data size, compute cost, engineering time)",
    ],
    lecturer: "Amos Yoffe",
    icon: <Rocket className="w-6 h-6" />,
    level: "advanced",
    techLogos: [
      "https://cdn.brandfetch.io/nvidia.com/w/400/h/400?c=1idjQoo38323pC02ZXr",
      "https://cdn.brandfetch.io/aws.amazon.com/w/400/h/400?c=1idjQoo38323pC02ZXr"
    ]
  },
  {
    id: "lecture-4",
    title: "Inference Optimizations",
    description: "A technical lecture on the various techniques to optimize LLM inference.",
    topics: [
      "Performance metrics: FLOPs, IO, chip/system utilization",
      "Performance metrics: TTFT, TTOT, E2E, tok/s, req/s, PXX",
      "Batching strategies: static, dynamic, continuous",
      "Attention optimization: KV Cache, Flash-attention, Paged-attention",
      "Token prefill optimization, speculative decoding, medusa layers",
      "Disaggregated serving & the llm-d project",
    ],
    lecturer: "Dr. Danny Harnik (IBM Research) & Dr. Roy Nissim (Red Hat)",
    icon: <Gauge className="w-6 h-6" />,
    level: "advanced",
    techLogos: [
      "https://cdn.brandfetch.io/onnx.ai/w/400/h/400?c=1idjQoo38323pC02ZXr",
    ]
  },
  {
    id: "lecture-5",
    title: "Multimodal & Post-Transformer Architectures",
    description: "Exploring architectures beyond the classical Transformer and multimodal AI.",
    topics: [
      "Transformer limitations: quadratic attention costs and finite context windows",
      "Sparse and extended attention: Transformer-XL and efficiency-oriented variants",
      "State Space Models (SSMs): RWKV, Hyena, and Mamba",
      "Hybrid architectures: AI21's Jamba (MoE + Mamba)",
      "Multimodal model design: fusion architectures for vision, text, and audio",
      "Architectures for reasoning: Tree-of-Thoughts, self-reflection",
      "The evolving landscape beyond classical Transformers",
    ],
    lecturer: "Dan Padnos (Riverside, ex. AI21 Labs)",
    icon: <Cpu className="w-6 h-6" />,
    level: "advanced",
    techLogos: [
      "https://cdn.brandfetch.io/ai21.com/w/400/h/400?c=1idjQoo38323pC02ZXr",
      "https://cdn.brandfetch.io/mistral.ai/w/400/h/400?c=1idjQoo38323pC02ZXr"
    ]
  },
  {
    id: "lecture-6",
    title: "Post-Training Fundamentals",
    description: "A technical lecture on the various techniques for tuning LLMs.",
    topics: [
      "Extended pre-training (DAPT, TAPT)",
      "Supervised tuning (SFT, PEFT)",
      "RL-based tuning (DPO, PPO, GRPO)",
      "Compressions (KD, PTQ, QAT)",
    ],
    lecturer: "Oded Ovadia",
    icon: <Settings className="w-6 h-6" />,
    level: "intermediate",
  },
  {
    id: "lecture-7",
    title: "Supercharging LLMs with Knowledge",
    description: "Understanding embeddings, semantic search, RAG, and how to augment LLMs with external knowledge.",
    topics: [
      "Embeddings fundamentals & frameworks",
      "Keywords-based vs. vector-based search",
      "Vector databases & retrieval techniques",
      "Preparing data for AI: quality, relevance, and scale",
      "RAG best practices: indexing, optimizing recall/precision",
      "RAG evaluation methodologies",
    ],
    icon: <Search className="w-6 h-6" />,
    level: "intermediate",
    techLogos: [
      "https://cdn.brandfetch.io/pinecone.io/w/400/h/400?c=1idjQoo38323pC02ZXr",
      "https://cdn.brandfetch.io/weaviate.io/w/400/h/400?c=1idjQoo38323pC02ZXr",
      "https://cdn.brandfetch.io/langchain.com/w/400/h/400?c=1idjQoo38323pC02ZXr",
      "https://cdn.brandfetch.io/llamaindex.ai/w/400/h/400?c=1idjQoo38323pC02ZXr"
    ]
  },
  {
    id: "lecture-8",
    title: "From Models to Systems to Agents",
    description: "The transformation from standalone models to agentic AI systems.",
    topics: [
      "Prompt engineering evolution: ReAct, Chain-of-Thought, Self-Consistency",
      "Chains and workflows: sequential, branching, and parallel task pipelines",
      "The agentic toolkit: function calling, tools, routers, memory",
      "AI orchestration frameworks: LangChain and modular systems",
      "Autonomous agents: goal-driven, self-directed reasoning and action",
    ],
    lecturer: "Vlad Luzin (Co-founder & CTO, Thenvoi)",
    icon: <Code2 className="w-6 h-6" />,
    level: "intermediate",
    techLogos: [
      "https://cdn.brandfetch.io/langchain.com/w/400/h/400?c=1idjQoo38323pC02ZXr",
    ]
  },
  {
    id: "lecture-9",
    title: "Evaluating GenAI Systems",
    description: "A technical lecture on the various techniques for evaluating LLMs.",
    topics: [
      "Predictive vs Generative evaluation metrics",
      "Accuracy metrics (Perplexity, BLEU/ROUGE, Bert-score, LLM as a Judge)",
      "GenAI metrics (Fluency, Factuality, Coherence, Bias)",
      "GenAI benchmarks (MMLU, HellaSwag, etc.)",
      "Guardrails",
      "Leaderboards and how to navigate them",
    ],
    lecturer: "Dr. Elad Levi (Plurai)",
    icon: <Sparkles className="w-6 h-6" />,
    level: "intermediate",
  },
  {
    id: "lecture-10",
    title: "The Future Directions of AI Research",
    description: "A forward-looking lecture on emerging paradigms and open research questions in AI.",
    topics: [
      "Emerging paradigms in AI",
      "Open research questions shaping the next decade of AI",
    ],
    lecturer: "Prof. Gal Chechik (NVIDIA & BIU)",
    icon: <Sparkles className="w-6 h-6" />,
    level: "advanced",
  },
]

export function TechnicalCurriculum() {
  const lectureGroups = [
    lectures.slice(0, 2),
    lectures.slice(2, 4),
    lectures.slice(4, 6),
    lectures.slice(6, 8),
    lectures.slice(8, 10),
  ]

  const getLevelColor = (level?: string) => {
    if (!level) return "bg-gray-100 text-gray-800"
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="pre-materials" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="pre-materials" className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Prep
          </TabsTrigger>
          <TabsTrigger value="group-1" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> 1-2
          </TabsTrigger>
          <TabsTrigger value="group-2" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> 3-4
          </TabsTrigger>
          <TabsTrigger value="group-3" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> 5-6
          </TabsTrigger>
          <TabsTrigger value="group-4" className="flex items-center gap-2">
            <Cpu className="w-4 h-4" /> 7-8
          </TabsTrigger>
          <TabsTrigger value="group-5" className="flex items-center gap-2">
            <Rocket className="w-4 h-4" /> 9-10
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pre-materials" className="space-y-6">
          <Card
            className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
          >
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[1fr_2fr] overflow-hidden">
                <div className="bg-primary/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {preMaterials.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{preMaterials.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(preMaterials.level || "")}`}>
                          {preMaterials.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{preMaterials.description}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {preMaterials.techLogos?.map((logo, i) => (
                      <div key={i} className="w-8 h-8 relative">
                        <NextImage
                          src={logo}
                          alt="Tech logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-background">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Topics Covered</h4>
                  <ul className="space-y-2 mb-6">
                    {preMaterials.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                          {i + 1}
                        </span>
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {lectureGroups.map((group, index) => (
          <TabsContent key={`group-${index + 1}`} value={`group-${index + 1}`} className="space-y-6">
            {group.map((lecture) => (
              <Card
                key={lecture.id}
                className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-[1fr_2fr] overflow-hidden">
                    <div className="bg-primary/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {lecture.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{lecture.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(lecture.level || "")}`}>
                              {lecture.level}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{lecture.description}</p>
                      </div>
                      {lecture.lecturer && (
                        <p className="text-sm font-medium mt-4">
                          <span className="text-muted-foreground">Lecturer:</span> {lecture.lecturer}
                        </p>
                      )}
                      {lecture.techLogos && lecture.techLogos.length > 0 && (
                        <div className="flex gap-2 mt-4">
                          {lecture.techLogos.map((logo, i) => (
                            <div key={i} className="w-8 h-8 relative">
                              <NextImage
                                src={logo}
                                alt="Tech logo"
                                fill
                                className="object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-background">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Topics Covered</h4>
                      <ul className="space-y-2">
                        {lecture.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                              {i + 1}
                            </span>
                            <span className="text-sm">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
