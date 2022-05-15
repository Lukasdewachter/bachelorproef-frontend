import React from "react";
import './Footer.css'
function Footer() {
  return (
      <footer className="footer">
          <p className="text-left text-white">
            2022 © KU Leuven
          </p>

          <div className="socials">
            <a href="https://www.facebook.com/KULeuven/" target="_blank"><ion-button onClick=""><ion-icon name="logo-facebook" size="large"></ion-icon> </ion-button></a>
            <a href="https://twitter.com/KU_Leuven/" target="_blank"><ion-button onClick=""><ion-icon name="logo-twitter" size="large"></ion-icon> </ion-button></a>
            <a href="https://www.instagram.com/kuleuven/" target="_blank"><ion-button onClick=""><ion-icon name="logo-instagram" size="large"></ion-icon> </ion-button></a>
            <a href="https://www.linkedin.com/school/ku_leuven/" target="_blank"><ion-button onClick=""><ion-icon name="logo-linkedin" size="large"></ion-icon> </ion-button></a>
            <a href="https://www.youtube.com/user/kuleuven/" target="_blank"><ion-button onClick=""><ion-icon name="logo-youtube" size="large"></ion-icon> </ion-button></a>
          </div>
      </footer>
    );
}

export default Footer;