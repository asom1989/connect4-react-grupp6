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
type ValidationErrors = {
  name: null | string;
  nameIsTouched: boolean;
  password: null | string;
  passwordIsTouched: boolean;
  isValid: boolean;
};

const CREDENTIALS_REGEX = /^[A-ZÅÄÖa-zåäö[0-9]{3,20}$/;
const ERROR_STATE: ValidationErrors = { name: null, nameIsTouched: false, password: null, passwordIsTouched: false, isValid: false };
const ERROR = "3-20 characters(a-ö, 0-9)";
const MIN_LENGTH_ERROR = "Must be no less then 3 characters";
const MAX_LENGT_ERROR = "Must be no more then 20 characters";
const LOGIN_ERROR = "Login failed, try again";
const REGISTER_ERROR = "Registration failed, try again";

export default function PlayerInput({setPlayer} : {setPlayer: (player: Player) => void}) {
  const [selectedTab, setSelectedTab] = useState<string>("Guest");
  const [user, setUser] = useState<UserData>(userData);
  const [errors, setErrors] = useState<ValidationErrors>({name: null, nameIsTouched: false, password: null, passwordIsTouched: false, isValid: false });

  const handleErrors = (selected: string, username: string, password: string) => {
    const newErrors: ValidationErrors = {...errors, name: null, password: null, isValid: true };
    if (selected === "Guest" && !CREDENTIALS_REGEX.test(username)) {
      newErrors.name = ERROR;
      if (username.length < 3) { newErrors.name = MIN_LENGTH_ERROR }
      if (username.length > 20) { newErrors.name = MAX_LENGT_ERROR }
    }
    if (selected === "Login" || selected === "Register") {
      if (!CREDENTIALS_REGEX.test(username)) {
        newErrors.name = ERROR;
        if (username.length < 3) { newErrors.name = MIN_LENGTH_ERROR }
        if (username.length > 20) { newErrors.name = MAX_LENGT_ERROR }
      }
      if (!CREDENTIALS_REGEX.test(password)) {
        newErrors.password = ERROR;
        if (password.length < 3) { newErrors.password = MIN_LENGTH_ERROR }
        if (password.length > 20) {
          newErrors.password = MAX_LENGT_ERROR;
        }
      }
    }
    if (newErrors.name || newErrors.password) { newErrors.isValid = false }

    return newErrors;
  };
  
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
      setErrors(handleErrors(selectedTab, newUser.name, newUser.password));
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
    //const resetErrors = false;
    if (selectedTab === "Guest") {
      setPlayer({ name: user.name, image: "" });
      setUser(userData)
      setErrors(ERROR_STATE);

    }
    if (selectedTab === "Login") {
      const result = await loginUser(user.name, user.password);
      if (result) {
        setPlayer({name: result.username, image: result.userProfileImage});
        setUser(userData);
        setErrors(ERROR_STATE)
      }
      if (!result) {
      setErrors((prevErrors) => ({...prevErrors, name: LOGIN_ERROR}))
    }
    }
    if (selectedTab === "Register") {
      const result = await registerUser(user.name, user.password, user.image);
      if (result) {
        setPlayer({name: result.username, image: result.userProfileImage });
        setUser(userData);
        setErrors(ERROR_STATE);
      }
      if (!result) {
        setErrors((prevErrors) => ({...prevErrors, name: REGISTER_ERROR}))
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
          <p className={styles.error}>
            {errors.nameIsTouched && errors.name ? `${errors.name}` : ""}
          </p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.input}
            value={user.name}
            onChange={handleChange}
            onBlur={() =>
              setErrors((prevErrors) => ({
                ...prevErrors,
                nameIsTouched: true,
              }))
            }
          />
        </label>

        {selectedTab !== "Guest" && (
          <label htmlFor="password" className={styles.label}>
            <p className={styles.error}>
              {errors.passwordIsTouched && errors.password
                ? `${errors.password}`
                : ""}
            </p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={user.password}
              onChange={handleChange}
              onBlur={() =>
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  passwordIsTouched: true,
                }))
              }
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
        <button type="submit" className={styles.button} disabled={!errors.isValid}>
          {selectedTab === "Guest" ? "Next" : selectedTab}
        </button>
      </form>
    </section>
  );
}
