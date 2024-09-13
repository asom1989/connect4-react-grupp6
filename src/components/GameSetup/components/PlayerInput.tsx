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
      <form className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          <p className={styles.error}></p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.input}
            value={user.name}
            onChange={handleChange}
          />
        </label>

        {selectedTab !== "Guest" && (
          <label htmlFor="password" className={styles.label}>
            <p className={styles.error}></p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={user.password}
              onChange={handleChange}
            />
          </label>
        )}

        
        <button type="button" className={styles.button}>
          {selectedTab === "Guest" ? "Next" : selectedTab}
        </button>
      </form>
    </section>
  );
}