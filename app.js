document.addEventListener("DOMContentLoaded", () => {
  // --- MOBILE NAVIGATION ---
  const burgerMenu = document.getElementById("burgerMenu");
  const navLinks = document.getElementById("navLinks");
  const navItems = navLinks.querySelectorAll("a");

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        burgerMenu.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // --- SMOOTH SCROLL & ACTIVE STATE (SCROLL SPY) ---
  const sections = document.querySelectorAll("section[id]");
  
  const scrollSpy = () => {
    const scrollY = window.pageYOffset + 120; // offset for sticky navbar

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItems.forEach(link => link.classList.remove("active"));
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      }
    });

    // If at the very top, set Home active
    if (window.scrollY < 100) {
      navItems.forEach(link => link.classList.remove("active"));
      const homeLink = document.querySelector('.nav-links a[href="#"]');
      if (homeLink) homeLink.classList.add("active");
    }
  };

  window.addEventListener("scroll", scrollSpy);
  scrollSpy(); // Initial trigger

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const header = item.querySelector(".faq-header");
    const content = item.querySelector(".faq-content");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-content").style.maxHeight = null;
        }
      });

      // Toggle current FAQ item
      if (isActive) {
        item.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // --- BOOKING MODAL MANAGER ---
  const appointmentModal = document.getElementById("appointmentModal");
  const closeAppointmentBtn = document.getElementById("closeAppointmentModal");
  const openAppointmentBtns = document.querySelectorAll(".btn-open-booking");
  const appointmentForm = document.getElementById("appointmentForm");

  // Track field defaults if open via specific trigger
  let predefinedPackage = "";

  const openModal = (modalElement) => {
    modalElement.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeModal = (modalElement) => {
    modalElement.classList.remove("active");
    document.body.style.overflow = ""; // Restore scroll
    predefinedPackage = ""; // Reset
  };

  if (appointmentModal && closeAppointmentBtn) {
    openAppointmentBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Check if there is a predefined package we want to pass in
        const pkgAttr = btn.getAttribute("data-package");
        if (pkgAttr) {
          predefinedPackage = pkgAttr;
          const trackSelect = document.getElementById("interestTrack");
          if (trackSelect) {
            trackSelect.value = predefinedPackage;
          }
        }
        
        openModal(appointmentModal);
      });
    });

    closeAppointmentBtn.addEventListener("click", () => {
      closeModal(appointmentModal);
    });

    // Close on overlay click
    appointmentModal.addEventListener("click", (e) => {
      if (e.target === appointmentModal) {
        closeModal(appointmentModal);
      }
    });
  }

  // --- FORM SUBMIT TO WHATSAPP ---
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const parentName = document.getElementById("parentName").value.trim();
      const childName = document.getElementById("childName").value.trim();
      const childAge = document.getElementById("childAge").value;
      const interestTrack = document.getElementById("interestTrack").value;

      if (!parentName || !childAge || !interestTrack) {
        alert("Please fill in all required fields.");
        return;
      }

      // WhatsApp Formatting
      const phoneNumber = "60108079133"; // MIRAI School Learning Advisor WhatsApp Number
      
      let message = `Hi *MIRAI School*! 🚀\n`;
      message += `I'd like to book a future-ready learning consultation for my child.\n\n`;
      message += `*Parent's Name:* ${parentName}\n`;
      if (childName) {
        message += `*Child's Name:* ${childName}\n`;
      }
      message += `*Child's Age:* ${childAge} years old\n`;
      message += `*Interested Track/Package:* ${interestTrack}\n\n`;
      message += `Please advise us on the next steps. Thank you!`;

      // Create WhatsApp Link
      const encodedText = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");

      // Close modal and reset form
      closeModal(appointmentModal);
      appointmentForm.reset();
    });
  }

  // --- DYNAMIC PROGRAMME DETAILS MODAL ---
  const programmeModal = document.getElementById("programmeModal");
  const closeProgrammeBtn = document.getElementById("closeProgrammeModal");
  const modalProgName = document.getElementById("modalProgName");
  const modalProgTag = document.getElementById("modalProgTag");
  const modalProgDesc = document.getElementById("modalProgDesc");
  const modalProgSpecs = document.getElementById("modalProgSpecs");
  const modalProgCTA = document.getElementById("modalProgCTA");

  // Packages descriptions details
  const packagesInfo = {
    "starter": {
      name: "MIRAI Starter",
      tag: "Begin Your Future Journey",
      desc: "An introductory gateway designed specifically for young learners starting out. We foster foundational curiosity, critical thinking, and simple structured logic through playful online sessions.",
      specs: [
        "Ages: 7 - 12 recommended",
        "2 Live Interactive Classes per week (60m each)",
        "2 Structured Video lessons with project exercises",
        "Introduction to Scratch block coding",
        "Basic robotics logic & visual understanding",
        "Access to basic virtual project classroom",
        "Class completion certificate"
      ],
      whatsappVal: "MIRAI Starter Package"
    },
    "explorer": {
      name: "MIRAI Explorer",
      tag: "Build & Broaden Horizons",
      desc: "Our combined comprehensive track. Designed for learners who are eager to experience both hardware-centric robotics simulations and software-centric AI coding applications simultaneously.",
      specs: [
        "Ages: 9 - 15 recommended",
        "2 Robotics Simulation Live classes per week",
        "2 AI Coding Zoom Interactive classes per week",
        "Learn core hardware logic & virtual wiring blueprints",
        "Basic Python structural foundations",
        "Hands-on creation of 6 virtual smart-device projects",
        "Platform project portfolio access"
      ],
      whatsappVal: "MIRAI Explorer Package"
    },
    "builder": {
      name: "MIRAI Builder",
      tag: "Create & Develop Focused Depth",
      desc: "An intensive single-focused program. Students choose either the full Robotics track or the complete AI Coding track, gaining advanced build competencies and specialized engineering models.",
      specs: [
        "Ages: 13 - 19 recommended",
        "4 Specialized Live Classes per week (Robotics OR Coding)",
        "Advanced coding blueprints (Javascript/Python modules)",
        "Complex logic trees & API data integrations",
        "Real-world problem-solving project modules",
        "1-on-1 monthly learning progress reviews",
        "Personalized digital portfolio showcases"
      ],
      whatsappVal: "MIRAI Builder Package"
    },
    "innovator": {
      name: "MIRAI Innovator",
      tag: "Lead & Invent the Smarter Future",
      desc: "Our elite tier program designed for advanced, long-term builders. Delivers absolute depth across dual engineering domains: combined physical computing systems and actual AI neural net projects.",
      specs: [
        "Ages: 15 - 25 recommended",
        "4 Live Robotics Classes + 4 AI Coding Zoom classes per week",
        "Elite track syllabus: machine learning models, IoT integrations",
        "Capstone projects designed to solve actual societal needs",
        "Presentation workshops: build confidence & startup-pitch skills",
        "Direct career & university portfolio advisory support",
        "Direct access to masterclasses & industry mentors"
      ],
      whatsappVal: "MIRAI Innovator Package"
    }
  };

  const learnMoreBtns = document.querySelectorAll(".btn-learn-more");

  if (programmeModal && closeProgrammeBtn) {
    learnMoreBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const pkgId = btn.getAttribute("data-package-id");
        const data = packagesInfo[pkgId];

        if (data) {
          modalProgName.textContent = data.name;
          modalProgTag.textContent = data.tag;
          modalProgDesc.textContent = data.desc;

          // Clear previous specs
          modalProgSpecs.innerHTML = "";
          data.specs.forEach(spec => {
            const li = document.createElement("li");
            li.innerHTML = `
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${spec}</span>
            `;
            modalProgSpecs.appendChild(li);
          });

          // Custom select trigger on CTA
          modalProgCTA.setAttribute("data-package", data.whatsappVal);

          openModal(programmeModal);
        }
      });
    });

    closeProgrammeBtn.addEventListener("click", () => {
      closeModal(programmeModal);
    });

    // Close on overlay click
    programmeModal.addEventListener("click", (e) => {
      if (e.target === programmeModal) {
        closeModal(programmeModal);
      }
    });

    // Link modal CTA to WhatsApp Booking
    modalProgCTA.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal(programmeModal);

      // Pre-fill package value
      const targetPkg = modalProgCTA.getAttribute("data-package");
      const trackSelect = document.getElementById("interestTrack");
      if (trackSelect && targetPkg) {
        trackSelect.value = targetPkg;
      }

      // Small delay to let first modal close before opening next
      setTimeout(() => {
        openModal(appointmentModal);
      }, 300);
    });
  }

  // --- INTERACTIVE PROGRAMME ADVISOR (QUIZ WIDGET) ---
  const quizSteps = document.querySelectorAll(".quiz-step");
  const nextStepBtn = document.getElementById("nextStepBtn");
  const prevStepBtn = document.getElementById("prevStepBtn");
  const quizProgressDots = document.querySelectorAll(".progress-dot");
  const quizResultDiv = document.getElementById("quizResult");
  const recommendedTitle = document.getElementById("recommendedTitle");
  const recommendedDesc = document.getElementById("recommendedDesc");
  const quizWhatsAppBtn = document.getElementById("quizWhatsAppBtn");

  let currentQuizStep = 0;
  const quizAnswers = {
    age: "",
    focus: "",
    mode: ""
  };

  // Enable/Disable next button based on selection
  const validateCurrentStep = () => {
    let isValid = false;
    if (currentQuizStep === 0 && quizAnswers.age) isValid = true;
    if (currentQuizStep === 1 && quizAnswers.focus) isValid = true;
    if (currentQuizStep === 2 && quizAnswers.mode) isValid = true;

    nextStepBtn.disabled = !isValid;
    nextStepBtn.style.opacity = isValid ? "1" : "0.5";
  };

  // Option selections clicks
  const setupQuizOptions = () => {
    const step1Options = document.querySelectorAll(".quiz-step[data-step='0'] .quiz-option");
    const step2Options = document.querySelectorAll(".quiz-step[data-step='1'] .quiz-option");
    const step3Options = document.querySelectorAll(".quiz-step[data-step='2'] .quiz-option");

    step1Options.forEach(opt => {
      opt.addEventListener("click", () => {
        step1Options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        quizAnswers.age = opt.getAttribute("data-val");
        validateCurrentStep();
      });
    });

    step2Options.forEach(opt => {
      opt.addEventListener("click", () => {
        step2Options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        quizAnswers.focus = opt.getAttribute("data-val");
        validateCurrentStep();
      });
    });

    step3Options.forEach(opt => {
      opt.addEventListener("click", () => {
        step3Options.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        quizAnswers.mode = opt.getAttribute("data-val");
        validateCurrentStep();
      });
    });
  };

  const updateQuizUI = () => {
    // Show/Hide steps
    quizSteps.forEach((step, idx) => {
      if (idx === currentQuizStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    // Update buttons
    if (currentQuizStep === 0) {
      prevStepBtn.style.visibility = "hidden";
    } else {
      prevStepBtn.style.visibility = "visible";
    }

    if (currentQuizStep === 3) {
      // Results step
      nextStepBtn.style.display = "none";
      prevStepBtn.style.display = "none";
      calculateQuizResult();
    } else {
      nextStepBtn.style.display = "inline-flex";
      prevStepBtn.style.display = "inline-flex";
      nextStepBtn.textContent = currentQuizStep === 2 ? "Get Recommendation" : "Next Step";
    }

    // Update Progress dots
    quizProgressDots.forEach((dot, idx) => {
      dot.className = "progress-dot";
      if (idx === currentQuizStep) {
        dot.classList.add("active");
      } else if (idx < currentQuizStep) {
        dot.classList.add("completed");
      }
    });

    validateCurrentStep();
  };

  const calculateQuizResult = () => {
    let resultPkg = "MIRAI Explorer";
    let pkgDetails = "";
    
    const { age, focus, mode } = quizAnswers;

    // Recommendation logic tree
    if (mode === "flexible") {
      resultPkg = "MIRAI Starter";
      pkgDetails = "Ideal for introducing young learners aged 7-12 to the foundations of AI, block coding, and core engineering logic without pressure.";
    } else if (mode === "comprehensive") {
      if (age === "young" || age === "teen") {
        resultPkg = "MIRAI Innovator";
        pkgDetails = "An intensive dual-track program built for advanced development. Perfect for mastering both AI Algorithms and physical Robotics blueprint simulations concurrently.";
      } else {
        resultPkg = "MIRAI Explorer";
        pkgDetails = "The perfect balanced combined package. Ideal for learners wanting structured dual tracks in both virtual robotics wiring and Zoom coding classes.";
      }
    } else { // mode === "focused"
      resultPkg = "MIRAI Builder";
      pkgDetails = "Highly targeted program structure. Perfect for intense development in a single specialty—either pure text-based Coding Foundations or structural Robotics Thinking.";
    }

    // Update Result UI
    recommendedTitle.textContent = resultPkg;
    recommendedDesc.textContent = `${pkgDetails} Specially designed based on your selections: age group (${age}), focus on (${focus}), and preferred class commitment (${mode}).`;

    // WhatsApp Action configuration
    quizWhatsAppBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const phoneNumber = "60108079133";
      let message = `Hi *MIRAI School*! 🚀\n`;
      message += `I just completed the Programme Advisor Quiz on your website and would like to learn more about the recommended package!\n\n`;
      message += `*Selected Age Group:* ${age.toUpperCase()}\n`;
      message += `*Selected Learning Focus:* ${focus.toUpperCase()}\n`;
      message += `*Preferred Mode:* ${mode.toUpperCase()}\n\n`;
      message += `*Quiz Recommendation:* *${resultPkg}*\n`;
      message += `Please advise us on booking a trial appointment for this path. Thank you!`;

      const encodedText = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

      window.open(whatsappUrl, "_blank");
    });
  };

  // Nav buttons click events
  if (nextStepBtn && prevStepBtn) {
    setupQuizOptions();
    validateCurrentStep();

    nextStepBtn.addEventListener("click", () => {
      if (currentQuizStep < 3) {
        currentQuizStep++;
        updateQuizUI();
      }
    });

    prevStepBtn.addEventListener("click", () => {
      if (currentQuizStep > 0) {
        currentQuizStep--;
        updateQuizUI();
      }
    });
    
    // Initial UI state
    updateQuizUI();
  }
});
