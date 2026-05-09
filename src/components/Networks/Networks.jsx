import Style from './Networks.module.css'

export default function Networks() {


  return (
    <div className={Style.contact}>

      <div className={Style.hero}>
        <div className={Style.badge}>get in touch</div>
        <h1>Let's <span>Connect</span></h1>
        <p>Have a question or just want to say hi? Reach out through any of the channels below.</p>
      </div>

      <div className={Style.grid}>
        <a className={Style.socialCard} href="https://web.facebook.com/mohamed.okasha23" target="_blank" rel="noopener noreferrer">
          <div className={Style.socialIcon}><i className="fab fa-facebook"></i></div>
          <div className={Style.socialInfo}>
            <div className={Style.socialName}>Facebook</div>
            <div className={Style.socialHandle}>Mohamed Okasha</div>
          </div>
          <i className="fas fa-arrow-up-right-from-square"></i>
        </a>
        <a className={Style.socialCard} href="https://www.instagram.com/m.okashaaa/" target="_blank" rel="noopener noreferrer">
          <div className={Style.socialIcon}><i className="fab fa-instagram"></i></div>
          <div className={Style.socialInfo}>
            <div className={Style.socialName}>Instagram</div>
            <div className={Style.socialHandle}>@m.okashaaa</div>
          </div>
          <i className="fas fa-arrow-up-right-from-square"></i>
        </a>
        <a className={Style.socialCard} href="https://www.linkedin.com/in/mohamed-okasha-8b09a623b/" target="_blank" rel="noopener noreferrer">
          <div className={Style.socialIcon}><i className="fab fa-linkedin"></i></div>
          <div className={Style.socialInfo}>
            <div className={Style.socialName}>LinkedIn</div>
            <div className={Style.socialHandle}>Mohamed Okasha</div>
          </div>
          <i className="fas fa-arrow-up-right-from-square"></i>
        </a>
        <a className={Style.socialCard} href="https://wa.me/201146085388" target="_blank" rel="noopener noreferrer">
          <div className={Style.socialIcon}><i className="fab fa-whatsapp"></i></div>
          <div className={Style.socialInfo}>
            <div className={Style.socialName}>WhatsApp</div>
            <div className={Style.socialHandle}>+20 114 608 5388</div>
          </div>
          <i className="fas fa-arrow-up-right-from-square"></i>
        </a>
      </div>

      <a className={Style.socialCard} href="mailto:mohamedokasha755@gmail.com" target="_blank" rel="noopener noreferrer">
        <div className={Style.socialIcon}><i className="fab fa-google"></i></div>
        <div className={Style.socialInfo}>
          <div className={Style.socialName}>Gmail</div>
          <div className={Style.socialHandle}>mohamedokasha755@gmail.com</div>
        </div>
        <i className="fas fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  )
}