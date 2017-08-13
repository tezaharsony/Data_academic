module.exports = value => {
  let giveScore = [];
  value.forEach(student_subject => {
    if(student_subject.score > 85 && student_subject.score <= 100) {giveScore.push('A');}
    if(student_subject.score > 70 && student_subject.score <=85) {giveScore.push('B');}
    if(student_subject.score > 55 && student_subject.score <= 70) {giveScore.push('C');}
    if(student_subject.score <= 55 && student_subject.score > 0) {giveScore.push('C');}
    if(student_subject.score === null) {giveScore.push('empty')}
  })
  return giveScore;
}
