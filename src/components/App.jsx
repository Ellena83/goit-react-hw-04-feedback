import { useState } from "react";
import { Section } from "./Section/Section";
import { Statistics } from "./Statistics/Statistics";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Notification } from './Notification/Notification';
import css from "./App.module.css";

export const App = () => {

  const [good, setGoodFeedback] = useState(0);
  const [neutral, setNeutralFeedback] = useState(0);
  const [bad, setBadFeedback] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedBack = countTotalFeedback();
    const goodFeedBack = good;
    let result = 0;

    if (totalFeedBack > 0) {
      result = Math.ceil((goodFeedBack / totalFeedBack) * 100);
    }
    return `${result}%`;
  }

  const handleClickButton = (evt) => {
    const option = evt.target.name;
    switch (option) {
      case 'good':
        setGoodFeedback(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutralFeedback(prevState => prevState + 1);
        break;
      case 'bad':
        setBadFeedback(prevState => prevState + 1);
        break;
      default:
        return;
    }

  }

  return (
    <div className={css.wrapper}>
      <div className={css.container}>

        <Section title="Please leave feedback"
          className={css.section}>

          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={handleClickButton}
          />
        </Section>

        <Section title="Statistics" >
          {countTotalFeedback() > 0 ? (<Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()} />) :
            (<Notification message="There is no feedback" />)
          }
        </Section>
      </div>
    </div>
  );

}