import { useState } from 'react';
import React from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import styles from './App.module.css';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const arrFeedbackNames = Object.keys(feedback);
  const { good, neutral, bad } = feedback;

  const handlerClick = name => {
    setFeedback(prev => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    return totalFeedback ? Math.round((good / totalFeedback) * 100) : 0;
  };

  return (
    <div className={styles.wrapped}>
      <Section className={styles.section} title="Please leave feedback">
        <FeedbackOptions
          options={arrFeedbackNames}
          onLeaveFeedback={handlerClick}
        />
      </Section>
      <Section title="Statsectionistics">
        {countTotalFeedback() > 0 && (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
      {countTotalFeedback() === 0 && (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};
