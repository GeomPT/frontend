# The Frontend for *GeomPT*
GeomPT is an AI-powered web platform for physical therapy providers to track and analyze patients' range of motion (ROM) over time. It helps address patient non-compliance and improves rehabilitation outcomes through data-driven insights and enhanced plan-of-care adherence.

<div align="center">
    <img src="https://github.com/user-attachments/assets/8c77259e-f6a1-46f7-88d7-4ea172e9f86e" alt="App Screenshot" width="800" height="533">
</div>

**[GeomPT Demonstration](https://docs.google.com/presentation/d/1aX4HL_4ctRLDHhU742Kiq83iDzT51yhmOSt3CVUF0l0/edit#slide=id.g30066d03a52_19_1)**

## Stack
- Next.js
- React
- Tailwind CSS + shadcn

## Project Structure
```
├─ app
│  ├─ exercises # Page for exercises designed to improve ROM 
│  ├─ progress # Assess/Progress page for tracking patient ROM over time 
│  └─ live # Live camera feed for testing real-time ROM measurement  
├─ components/ui # Shared UI components (e.g., live video frames, cards) 
└─ public # Static assets 
```

## Usage
1. Clone the repository:
    ```bash
    git clone https://github.com/GeomPT/frontend.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the frontend:
    ```bash
    npm run dev
    ```

The frontend will be available at `http://localhost:3000`. 

As users interact with the platform, the backend processes the data automatically **as long as its running simultaneously.**

## Contribution
1. Clone the repository locally:
    ```bash
    git clone https://github.com/yourusername/geompt-frontend.git
    ```

2. Install the project dependencies:
    ```bash
    npm install
    ```

3. Run the frontend in development mode:
    ```bash
    npm run dev
    ```

## Credit
- Steven Zhang
- Allen Liu
- Sandro Gopal
- Hector Astrom
