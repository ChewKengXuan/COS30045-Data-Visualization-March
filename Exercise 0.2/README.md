# COS30045 – Data Visualisation  
## Exercise 0.2 – Energy Website

Welcome to **Exercise 0.2** for COS30045 Data Visualisation.

In this exercise, you will build a simple **Energy Data Webpage** using **HTML, CSS, and JavaScript**. The purpose of this exercise is to familiarise you with the development workflow using **GitHub and VS Code**, while preparing the foundation for future data visualisation tasks.

---

# Objective

The objectives of this exercise are:

- Understand how to use **GitHub for version control**
- Practice **web development structure**
- Build a **basic website**
- Maintain **regular commits**
- Identify commits that include **GenAI-generated code**

---

# Step 1 – Fork the Repository

1. Open this repository.
2. Click **Fork** at the top right of the page.
3. This will create a copy of the repository in your GitHub account.

Example:

Original repository : "github.com/rishmaf/COS30045-Data-Visualization/energy-webpage"

Your forked repository : "github.com/yourusername/COS30045-Data-Visualization/energy-webpage"


---

# Step 2 – Clone the Repository

Clone your forked repository to your local machine using **VS Code** or the terminal.



# Step 3 – Project Structure


Your project must follow the structure below.

```bash
energy-webpage-v1
│
├── css
│   └── styles.css
│
├── js
│   └── scripts.js
│
├── images
│   └── PowerIcon.png
│
├── data
│   └── data.csv
│
├── index.html
└── README.md



Generative AI Usage Declaration

Introduction: I used AI to support my workflow by helping structure and draft a clear reflection on how AI contributed to this coding task.

Tool GitHub Copilot in VS Code: an AI-assisted development tool that suggests text and code in context.
Usage Details:
-Prompts Used: "Make an simple interative code that allows transition between three pages with Javascript included."
-Outputs Received:  <!-- Main Content -->
    <main class="container">
        <!-- Home Page -->
        <section id="home" class="page active">
            <h1>Energy Consumption in Australia</h1>
            <p>Welcome to our energy consumption tracker. Discover how much power your household appliances use.</p>
        </section>

        <!-- Televisions Page -->
        <section id="televisions" class="page">
            <h1>Television Energy Consumption</h1>
            <p>Explore the energy usage of popular television models in the Australian market.</p>

        </section>
        <!-- About Us Page -->
        <section id="about" class="page">
            <h1>About Us</h1>
            <p>This website is part of the COS30045 Data Visualisation course assignment.</p>
            <div class="content-box">
                <h2>Our Mission</h2>
                <p>To educate Australians about appliance energy consumption and promote sustainable living practices through data visualisation and accessible information.</p>
            </div>
        </section>
    </main>


-Modifications Made: I refined the wording for clarity and removed any generic or irrelevant parts. I adjusted the response to state that the AI-generated content is not entirely original and to acknowledge assistance properly.

Reflection: Utilizing AI has help me in making a more compacted code, and assisted me in finding certain lines of code that may cause contradictions and errors

Acknowledgment: I acknowledge that Generative AI is used in the making of this code. 