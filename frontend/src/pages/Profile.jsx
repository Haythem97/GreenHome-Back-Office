import { FaSignInAlt } from "react-icons/fa";
import { login } from "../features/auth/authSlice";
import { update, reset } from "../features/auth/authSlice";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCamera } from "react-icons/ai";
import styles from "./Profile.module.scss";
function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password); // New password

  const userData = {
    name,
    email,
    password,
  };

  
  const [isReadonly, setIsReadonly] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user) {
    navigate("/login");
  }
  const handleSubmit = () => {
    if (isReadonly) {
      setIsReadonly(!isReadonly);
    } else {
      // e.preventDefault();
       const token = localStorage.getItem("token");

      dispatch(update(userData))
        .then((data) => {
          console.log(data);
          console.log('userData',userData)
          console.log('name',name,email,password)
        })
        .catch((err) => console.log(err));
      setIsReadonly(!isReadonly);
    }
  };

  console.log("user", user);
  return (
    <>
      <div className="container">
        <div className={isReadonly ? styles.profil : styles.wrapper}>
          <section className="heading">
            <p>Coordonnés</p>
          </section>
          <section className="form">
            <h1>Profile Information</h1>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                readOnly={isReadonly} // Set the input to readonly
                type="text"
                id="name"
                name="name"
                value={(name) || ""}
                onChange={(e) => setName(e.target.value)}

              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={(email) || ""}
                readOnly={isReadonly} // Set the input to readonly
                onChange={(e) => setEmail(e.target.value) }
              />
            </div>
            {isReadonly === false ? (
              <div className="form-group">
                <label> Nouveau mot de passe </label>
                <input
                  readOnly={isReadonly}
                  label="Mot de passe"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Nouveau mot de passe"
                  onChange={(e) =>  setPassword(e.target.value) }
                />
              </div>
            ) : (
              <></>
            )}

            {/* You can add more readonly input fields for other user information */}
          </section>
          <div  className={styles.formBouton}>
          <div className={styles.col4}>
            <input
              className={styles.buttonSubmit}
              type="button"
              value="modifer mon profile"
              onClick={(e) => handleSubmit(e)}
            />
            </div>

            {isReadonly === false ? (
              <div className={styles.col4}>
                <input
                  onClick={(e) => setIsReadonly(!isReadonly)}
                  className={styles.buttonReset}
                  type="reset"
                  value="annuler"
                />
              </div>
            ) : (
              <></>
            )}
            </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
