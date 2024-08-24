import React from 'react'
import styles from "../App.module.css";
import { About } from "../components/About/About";
import { Contact } from "../components/Contact/Contact";
import { Experience } from "../components/Experience/Experience";
import { Hero } from "../components/Hero/Hero";

function Home() {
  return (
    <div className={styles.App}>
    <Hero/>
      <About />
      <Experience />
      <Contact />
   

    </div>
  )
}

export default Home