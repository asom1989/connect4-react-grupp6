import { useState } from "react";
import styles from "./player-input.module.css";

const tabOptions = ["Guest", "Login", "Register"];

type User = {
  name: string;
  password: string;
  image: null | File;
  imagePreview: null | string;
};

export default function PlayerInput() {
  const [selectedTab, setSelectedTab] = useState<string>("Guest");
  const [user, setUser] = useState<User>({
    name: "",
    password: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const image = e.currentTarget.files[0];
      const preview = URL.createObjectURL(image);
      setUser((prevUser) => ({
        ...prevUser,
        image: image,
        imagePreview: preview,
      }));
    } else {
      const { name, value } = e.currentTarget;
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    if (user.imagePreview) {
      URL.revokeObjectURL(user.imagePreview);
    }
    setUser((prevUser) => ({ ...prevUser, image: null, imagePreview: null }));
  };

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

        {selectedTab === "Register" && (
          <div className={styles.fileUpload}>
            <input
              type="file"
              name="userImage"
              accept=".jpg, .jpeg, .png"
              className={styles.fileInput}
              id="userImage"
              onChange={handleChange}
            />
            {!user.image && (
              <label htmlFor="userImage" className={styles.fileLabel}>
                Upload image
              </label>
            )}

            {user.imagePreview && (
              <>
                <img
                  src={user.imagePreview}
                  className={styles.imagePreview}
                  alt="user image"
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={handleRemoveImage}
                >
                  Change image
                </button>
              </>
            )}
          </div>
        )}
        <button type="button" className={styles.button}>
          {selectedTab === "Guest" ? "Next" : selectedTab}
        </button>
      </form>
    </section>
  );
}
