import React from 'react'
import styles from './Header.module.sass'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import CONSTANTS from '../../constants'
import {
  getUserAction,
  clearUserStore,
  headerRequest
} from '../../actions/actionCreator'

class Header extends React.Component {
  componentDidMount () {
    if (!this.props.data) {
      this.props.getUser()
    }
  }

  logOut = () => {
    localStorage.clear()
    this.props.clearUserStore()
    this.props.history.replace('/login')
  }

  startContests = () => {
    this.props.history.push('/startContest')
  }
  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
              alt='user'
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt='menu'
            />
            <ul>
              <li>
                <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to='/account' style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to='http:/www.google.com'
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to='http:/www.google.com'
                  style={{ textDecoration: 'none' }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <span onClick={this.logOut}>Logout</span>
              </li>
            </ul>
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt='email'
          />
        </>
      )
    } else {
      return (
        <>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>LOGIN</span>
          </Link>
          <Link to='/registration' style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>SIGN UP</span>
          </Link>
        </>
      )
    }
  }

  render () {
    if (this.props.isFetching) {
      return null
    }
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href='http://www.google.com'>Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <a href='tel:+8773553585'>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`}
                alt='phone'
              />
              (877)-355-35-85
            </a>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <Link to='#'>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
              className={styles.logo}
              alt='blue_logo'
            />
          </Link>
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>NAME IDEAS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com' target="_blank">Beauty</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">Consulting</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">E-Commerce</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">Fashion & Clothing</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">Finance</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">Real Estate</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">Tech</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com' target="_blank">More Categories</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>CONTESTS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com' target="_blank">HOW IT WORKS</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">PRICING</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">AGENCY SERVICE</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">WINNERS</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com' target="_blank">BECOME A CREATIVE</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Our Work</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com' target="_blank">NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">TAGLINES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com' target="_blank">TESTIMONIALS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Names For Sale</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com' target="_blank">POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">SHORT NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com' target="_blank">SELL YOUR DOMAINS</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Blog</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt='menu'
                  />
                  <ul>
                    <li>
                      <a href='http://www.google.com' target="_blank">ULTIMATE NAMING GUIDE</a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a href='http://www.google.com' target="_blank">CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href='http://www.google.com' target="_blank">ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {this.props.data && this.props.data.role !== CONSTANTS.CREATOR && (
              <div
                className={styles.startContestBtn}
                onClick={this.startContests}
              >
                START CONTEST
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.userStore
}
const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(headerRequest()),
    clearUserStore: () => dispatch(clearUserStore())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
