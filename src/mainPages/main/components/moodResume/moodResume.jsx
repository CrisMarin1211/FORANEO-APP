import React from 'react';
import './moodResume.css';

const MoodResume = ({ emotionData }) => {
  // Si no hay emoción registrada, mostrar mensaje.
  if (!emotionData) {
    return (
      <section className='MoodResume'>
        <p className='nodataMessage'>There are no emotions in your calendar yet...</p>
      </section>
    );
  }

  return (
    <section className='MoodResume'>
      <section className='moodResumeContainer'>
        <section className='moodResumeWrapp'>
          <h1 className='moodResumeMessage1'>Most of your days were...</h1>

          <section className='faceSection'>
            <img src={emotionData.src} alt={emotionData.label} width={74} height={69} />
            <h1 className='moodResumeMessage2'>{emotionData.label.toUpperCase()}</h1>
          </section>

          <h2 className='moodResumeMessage3'>Be kind to yourself! 🌿</h2>
        </section>
      </section>
    </section>
  );
};

export default MoodResume;
