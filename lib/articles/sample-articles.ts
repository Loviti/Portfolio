import { Article } from './index'

export const sampleArticles: Article[] = [
  {
    slug: 'building-ai-cat-guard',
    title: 'Building AI Cat-Guard: Computer Vision for Pet Health',
    date: '2025-01-15',
    author: 'Chase Pelky',
    excerpt:
      'How I used TensorFlow and a Raspberry Pi to identify which cat is using the litter box—and why it matters for pet health monitoring.',
    readTimeMinutes: 8,
    tags: ['AI', 'Computer Vision', 'TensorFlow', 'Raspberry Pi'],
    content: `
When I first got the idea for AI Cat-Guard, I was solving a problem every multi-cat household knows: which cat is actually using the litter box, and how often?

Turns out, changes in litter box behavior are one of the earliest indicators of feline health issues. Vets have told me they wish they had this data. So I built it.

## The Problem

If you have multiple cats sharing a Litter-Robot, you lose individual tracking. You know *someone* used it, but not *who*. Weight data becomes meaningless when you can't attribute it to a specific cat.

I wanted a system that could:

- Identify which cat approaches the litter box
- Log weight and usage frequency per cat
- Alert if patterns change (potential health issue)
- Do all of this passively, without disrupting the cats

## Choosing the Stack

I landed on **TensorFlow Lite** running on a **Raspberry Pi 4** with a camera module. The key constraints were:

1. **Low latency** — cats don't wait around
2. **Low power** — runs 24/7
3. **Privacy** — no cloud dependency for video
4. **Accuracy** — needs to distinguish between similar-looking cats

\`\`\`python
import tensorflow as tf
from picamera2 import Picamera2

# Load the quantized TFLite model
interpreter = tf.lite.Interpreter(model_path="cat_identifier.tflite")
interpreter.allocate_tensors()

# Capture and classify
def identify_cat(frame):
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    
    processed = preprocess(frame, input_details[0]['shape'])
    interpreter.set_tensor(input_details[0]['index'], processed)
    interpreter.invoke()
    
    prediction = interpreter.get_tensor(output_details[0]['index'])
    return CAT_NAMES[prediction.argmax()]
\`\`\`

## Training the Model

I collected about 500 images of each cat over two weeks. The model uses a MobileNetV2 backbone with transfer learning—fine-tuned on my specific cats.

The trickiest part was handling the varied lighting conditions near the litter box. I used aggressive data augmentation: brightness shifts, shadows, and angle variations.

## Results

After a month of testing:

- **96% identification accuracy** across three cats
- **33% faster diagnostic insights** according to our vet
- Zero false positives on non-cat detections (the dog was confused once, but correctly rejected)

The system now logs every visit to Supabase, and I built a simple dashboard to visualize trends.

## What I Learned

Building for the edge forces you to think differently. Model size matters. Inference speed matters. And the gap between a demo and a product that runs reliably for months is enormous.

The cats, for their part, remain unimpressed.

---

*AI Cat-Guard is open source. Check it out on [GitHub](https://github.com/loviti/ai-cat-guard).*
`,
  },
  {
    slug: 'from-hours-to-minutes-rfq-automation',
    title: 'From Hours to Minutes: Automating RFQ Workflows',
    date: '2025-02-20',
    author: 'Chase Pelky',
    excerpt:
      'How a React app transformed a 2-hour manual quoting process into a 15-minute workflow for an automotive manufacturer.',
    readTimeMinutes: 6,
    tags: ['React', 'Automation', 'Enterprise', 'ExcelJS'],
    content: `
At Rassini, the Request for Quote process was a bottleneck. Engineers spent hours manually filling Excel templates, cross-referencing part databases, and calculating costs. Every quote followed the same pattern, but the tools hadn't caught up.

I saw an opportunity to change that.

## The Old Way

Here's what a typical RFQ looked like before:

1. Receive customer specifications (PDF or email)
2. Open a master Excel template (300+ cells)
3. Manually look up material costs, tooling rates, labor hours
4. Fill in formulas, check cross-references
5. Generate a PDF for review
6. **Average time: ~2 hours per quote**

The bottleneck wasn't the engineering knowledge—it was the data entry.

## Designing the Solution

I built **RFQ Fast-Track** as a React single-page application with a Node.js backend. The key insight was that most of the Excel template could be auto-populated from existing databases.

The architecture was straightforward:

- **React frontend** with a step-by-step wizard interface
- **Node.js API** connecting to internal databases
- **ExcelJS** for generating the final Excel output (maintaining compatibility with existing workflows)
- **Azure AD** for authentication

\`\`\`typescript
// Auto-populate from part database
const populateQuote = async (partNumber: string) => {
  const partData = await fetchPartDetails(partNumber)
  const materials = await fetchMaterialCosts(partData.materials)
  const tooling = await calculateToolingCosts(partData.specs)
  
  return {
    ...partData,
    materialCost: materials.totalCost,
    toolingEstimate: tooling.estimate,
    laborHours: calculateLabor(partData.complexity),
    suggestedPrice: calculatePrice({
      materials, tooling, 
      margin: partData.targetMargin
    })
  }
}
\`\`\`

## The UX Challenge

Engineers aren't typical web app users. They think in spreadsheets. So instead of fighting that mental model, I embraced it:

- The wizard mirrors the Excel template's sections
- Fields auto-populate but remain editable
- A live preview shows the final quote as they work
- The output is still an Excel file—same format, same macros

This meant zero retraining. Engineers could start using it immediately.

## Impact

After rolling out to the quoting team:

- **Quote prep time dropped from 2 hours to 15 minutes**
- Error rate decreased by 60%
- Engineers could handle 3x more quotes per week
- The existing Excel workflow remained intact for downstream processes

## Lessons for Enterprise Tools

The biggest lesson: **don't replace workflows, accelerate them**. The temptation with enterprise software is to reimagine everything. But the engineers had years of institutional knowledge embedded in that Excel template. Respecting that while removing the tedium was the sweet spot.

Sometimes the best software is invisible. It does the boring parts so humans can focus on the interesting ones.
`,
  },
  {
    slug: 'why-i-build-with-ai',
    title: 'Why I Build With AI (And Why You Should Too)',
    date: '2025-03-10',
    author: 'Chase Pelky',
    excerpt:
      'AI isn\'t just a buzzword on my resume—it\'s a fundamental shift in how we build software. Here\'s my perspective after shipping real AI products.',
    readTimeMinutes: 5,
    tags: ['AI', 'Opinion', 'Software Development', 'Career'],
    content: `
Every few years, something comes along that genuinely changes how we write software. The cloud was one. Mobile was another. AI is the current one, and it's not slowing down.

But here's what I've noticed: most developers are either all-in on the hype or deeply skeptical. I think both camps are missing something.

## The Pragmatic Middle

I don't build with AI because it's trendy. I build with it because, for certain problems, it's genuinely the best tool available. Not every problem—but more than most people think.

Consider the projects I've shipped:

- **AI Cat-Guard** uses computer vision because no amount of traditional programming can reliably distinguish between two tabby cats in variable lighting
- **TaskSpark** uses an LLM for task categorization because the rules would be impossibly complex to hand-code
- **Builder Beaver** (the chatbot on this site) uses GPT because a decision tree would feel robotic

In each case, AI wasn't the starting point. The *problem* was the starting point. AI was the answer to "what's the best way to solve this?"

## What AI Actually Changes

Here's my framework for when AI makes sense:

### Use AI when:
- The rules are fuzzy or context-dependent
- You'd need thousands of if/else branches
- The input is unstructured (images, natural language, audio)
- Personalization matters at scale

### Don't use AI when:
- Deterministic logic works fine
- You need 100% reliability (use AI as an assistant, not the decision-maker)
- The problem is well-defined with clear rules
- A database query would suffice

## The Developer's Advantage

If you're a developer learning AI, you have a massive advantage over AI researchers learning to code. You already know how to:

- Ship products
- Handle edge cases
- Build UIs that humans actually want to use
- Deploy and monitor production systems

The AI part—model selection, prompt engineering, fine-tuning—is learnable. The product instinct is harder to teach.

## Getting Started

My advice for developers looking to incorporate AI:

1. **Start with APIs, not models.** OpenAI, Anthropic, and others have made it trivially easy to add intelligence to your apps. You don't need to train anything.

2. **Solve a real problem.** Don't build an AI demo. Build something you'd actually use. The constraints of real usage will teach you more than any tutorial.

3. **Learn the limitations.** AI hallucinates. Latency matters. Costs add up. Understanding these constraints early makes you a better AI developer.

4. **Build the glue.** The most valuable AI skill isn't prompt engineering—it's knowing how to integrate AI into a larger system. Data pipelines, error handling, fallbacks, caching.

## Looking Forward

I think we're in the "early internet" phase of AI. The tools are powerful but rough. The best practices are still forming. The developers who learn to build with AI now—thoughtfully, pragmatically—will have a significant edge.

Not because AI replaces developers. But because developers who understand AI will replace those who don't.

---

*Want to discuss AI development? Reach out through my [contact form](#contact) or ask Builder Beaver below.*
`,
  },
]
