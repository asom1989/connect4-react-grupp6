import { useState } from "react"
import styles from "./player-input.module.css";

const tabOptions = ["Guest", "Login", "Register"];

type User = {
  name: string;
  password: string;
  image: null | File;
  imagePreview: null | string;
}


export default function PlayerInput() {
  const [selectedTab, setSelectedTab] = useState<string>("Guest");
  const [user, setUser] = useState<User>({
    name: "",
    password: "",
    image: null,
    imagePreview: null,
  })


  return (
    <section className={styles.playerSection}>
      <div className={styles.tabButtons}>
        {tabOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.tabButton} ${
              option === selectedTab && `${styles.active}`
            }`}
            onClick={() => setSelectedTab(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}