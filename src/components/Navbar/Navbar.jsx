import React, { useRef, useState } from 'react'
import Style from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function Navbar(props) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const prevPath = useRef(null);
  const location = useLocation();




  function closeNav() {
    const nav = document.getElementById('navbarSupportedContent');
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
    }
  }
  return (
    <>
      <nav className={` ${Style.bgNav}  navbar navbar-expand-lg text-capitalize fixed-top `}>
        <div className="container-fluid ">
          <Link className="navbar-brand fw-bolder" to="home">noxe</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent" onClick={closeNav}>
            {props.userData ?

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">

                  <Link className="nav-link" to="home">home</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="movies">movies</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="tvShows">tvShows</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="people">people</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="about">about</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="networks">networks</Link>
                </li>
              </ul>
              : ''
            }

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <div className="social-icons">

                <a href="https://web.facebook.com/mohamed.okasha23" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook mx-1"></i>
                </a>

                <a
                  href="https://www.instagram.com/m.okashaaa/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram mx-1"></i>
                </a>

                <a href="https://www.linkedin.com/in/mohamed-okasha-8b09a623b/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin mx-1"></i>
                </a>

                <a href="https://wa.me/201146085388" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp mx-1"></i>
                </a>

              </div>
              {/* Search */}
              {props.userData ?
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  className={Style.searchInput}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) {
                      if (!prevPath.current) {
                        prevPath.current = location.pathname; // احفظ الصفحة الحالية
                      }
                      navigate(`/search?query=${e.target.value}`);
                    } else {
                      setSearchQuery('');
                      navigate(prevPath.current || '/home'); // ارجع ليها
                      prevPath.current = null;
                    }
                  }}
                />
                : ''}
              {props.userData ?
                <li className="nav-item">
                  <Link onClick={props.logout} className="nav-link" >logout</Link>
                </li> :
                <>

                  <li className="nav-item">
                    <Link className="nav-link" to="login">login</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="register">register</Link>
                  </li>
                </>
              }
            </ul>

          </div>
        </div>
      </nav>
    </>

  )
}
