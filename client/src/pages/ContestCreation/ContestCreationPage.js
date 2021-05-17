import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ContestCreationPage.module.sass';
import * as ActionCreators from '../../actions/actionCreator';
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const ContestCreationPage = ({ contestType, title }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { contestStore, bundleStore } = useSelector(
    ({ contestStore, bundleStore }) => ({ contestStore, bundleStore })
  );

  const { saveContestToStore } = bindActionCreators(ActionCreators, dispatch);

  const submitDataContest = values => {
    saveContestToStore({ type: contestType, info: values });
    history.push(
      bundleStore.bundle[contestType] === 'payment'
        ? '/payment'
        : bundleStore.bundle[contestType] + 'Contest'
    );
  };

  !bundleStore.bundle && history.replace('/startContest');

  const contestData = contestStore.contests[contestType]
    ? contestStore.contests[contestType]
    : { contestType };

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{title}</h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={contestType}
            submitData={submitDataContest}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContestCreationPage;
