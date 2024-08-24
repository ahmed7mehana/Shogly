import React from "react";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
  <footer id="contact" >
      <div className={styles.container}>

      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Welcome in my world..V-1</p>
        
      </div>
      
      
      <ul  className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a href="mailto:ahmed7mehana.gmail.com">gmail/ahmed</a>
        </li>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="LinkedIn icon"
          />
          <a href="https://www.linkedin.com/in/ahmed-mehana-b39967240/">linkedin/ahmed</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://github.com/ahmed7mehana?tab=repositories">github/ahmed</a>
        </li>
      </ul>

      </div>



  </footer>
  );
};
