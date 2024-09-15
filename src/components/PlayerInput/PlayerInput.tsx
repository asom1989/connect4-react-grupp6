import { useState } from "react";
import styles from "./player-input.module.css";
import { UserData, Player } from "../../types/types";
import registerUser from "../../utils/registerUser";
import loginUser from "../../utils/loginUser";

const tabOptions = ["Guest", "Login", "Register"];

const userData: UserData = {
  name: "",
  password: "",
  image: null,
  imagePreview: null,
}

export default function PlayerInput({setPlayer} : {setPlayer: (player: Player) => void}) {
  const [selectedTab, setSelectedTab] = useState<string>("Guest");
  const [user, setUser] = useState<UserData>(userData);

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
      const newUser = { ...user, [name]: value };
      setUser(newUser);
    }
  };

  const handleRemoveImage = () => {
    if (user.imagePreview) {
      URL.revokeObjectURL(user.imagePreview);
    }
    setUser((prevUser) => ({ ...prevUser, image: null, imagePreview: null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTab === "Guest") {
      setPlayer({ name: user.name, image: "" });
      setUser(userData)
    }
    if (selectedTab === "Login") {
      // Login and set player
      const result = await loginUser(user.name, user.password);
      if (result) {
        setPlayer({name: result.username, image: result.userProfileImage});
        setUser(userData);
      }
    if (!result) {
      // handle error
    }
    }
    if (selectedTab === "Register") {
      // Register user and set player
      const result = await registerUser(user.name, user.password, user.image);
      if (result) {
        setPlayer({name: result.username, image: result.userProfileImage });
        setUser(userData);
      }
      if (!result) {
        //handle error
      }
    }
  }

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
      <form className={styles.form} onSubmit={handleSubmit}>
        <p>
          {selectedTab === "Guest"
            ? "Play as guest"
            : selectedTab === "Login"
            ? "Login to existing player account"
            : "Register new player account"}
        </p>
        <label htmlFor="name" className={styles.label}>
          <p className={styles.error}>{errors.nameIsTouched && errors.name ? `${errors.name}`: ""}</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.input}
            value={user.name}
            onChange={handleChange}
            onBlur={() => setErrors((prevErrors) => ({...prevErrors, nameIsTouched: true}))}
          />
        </label>

        {selectedTab !== "Guest" && (
          <label htmlFor="password" className={styles.label}>
            <p className={styles.error}>{errors.passwordIsTouched && errors.password ? `${errors.password}`: ""}</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={user.password}
              onChange={handleChange}
              onBlur={() => setErrors((prevErrors) => ({...prevErrors, passwordIsTouched: true}))}
            />
          </label>
        )}

        {selectedTab === "Register" && (
          <div className={styles.fileUpload}>
            {!user.image && (
              <label htmlFor="userImage" className={styles.fileLabel}>
                Upload profile image
                <input
                  type="file"
                  name="userImage"
                  accept=".jpg, .jpeg, .png, .gif"
                  className={styles.fileInput}
                  id="userImage"
                  onChange={handleChange}
                />
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
      </form>
    </section>
  );
}
