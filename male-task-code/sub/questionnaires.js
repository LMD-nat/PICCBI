// QUESTIONNAIRES //

var demo1 = {
    type: 'survey-text',
    questions: [
      {prompt: "Please enter your prolific ID or your Concordia email", name:'prolID', required:true},
      {prompt: "What is your age in years?", name:'age', required:true},
      {prompt: "For statistical purposes, please enter your weight in pounds (lbs) (for reference, 1 lbs = 0.45kg = 0.07 stones). For example, if you weigh 135lbs, enter 135.", name:'weight', required:true},
      {prompt: "For statistical purposes, please enter your height in feet and inches (for reference, 1 foot = 0.3 meters). For example, if you are 5 foot 8, enter 5.8.", name:'height', required:true}
    ],
    preamble: '<br><br>Welcome! <br> Here are some questions about your background. <br> Please answer the following demographic questions as honestly as possible. <br> All of your responses are strictly confidential',
    on_finish: function(data){
      jsPsych.data.addProperties({
        prolID:  JSON.parse(data.responses)['prolID'],
        age: JSON.parse(data.responses)['age'],
        weight: JSON.parse(data.responses)['weight'],
        height: JSON.parse(data.responses)['height']
      });
    }
  };
  
  var health = {
    type: 'survey-text',
    questions: [
      {prompt: "If you have been diagnosed with a mental health condition <b>over the past 6 months</b>, please specify what kind of condition you have. If this does not apply to you, enter N/A.", placeholder: "e.g., Depressive Disorder, N/A", name:'mental', required:true},
      {prompt: "Are you currently taking medication for a mental health treatment? <b>If yes please specify the type</b>", placeholder: "Antidepressants, N/A", name:'mentdrug', required:true},
      {prompt: "If you are taking medication for a mental health treatment, please specify the drug name, frequency of use, and dosage", placeholder: "e.g., Sertraline, 15mg daily", name:'mentpos', required:true}
    ],
    preamble: '<br><br>Thank you. Below are some questions about your physical and mental health along with any medication you have been or are currently taking. <br> For any questions that do not apply to you, please enter "N/A". <br> All of your responses are strictly confidential.',
    on_finish: function(data){
      jsPsych.data.addProperties({ // add data to file
        mental: JSON.parse(data.responses)['mental'],
        mentdrug: JSON.parse(data.responses)['mentdrug'],
        mentpos: JSON.parse(data.responses)['mentpos']
      });
    }
  };
  
  var nfc = ['1: Extremely uncharacteristic of me', '2: Somewhat uncharacteristic of me', '3: Uncertain', '4: Somewhat characteristic of me', '5: Extremely characteristic of me']
  var NFC = {
    type: 'survey-likert',
    questions: [
      {prompt: "I prefer complex to simple problems.", name:'nfc_01', labels: nfc, required:true},
      {prompt: "I like to have the responsibility of handling a situation that requires a lot of thinking.", name:'nfc_02', labels: nfc, required:true},
      {prompt: "Thinking is not my idea of fun.", name:'nfc_03', labels: nfc, required:true},
      {prompt: "I would rather do something that requires little thought than something that is sure to challenge my thinking abilities.", name:'nfc_04', labels: nfc, required:true},
      {prompt: "I try to anticipate and avoid situations where there is a likely chance I will have to think in depth about something.", name:'nfc_05', labels: nfc, required:true},
      {prompt: "I find satisfaction in deliberating hard and for long hours.", name:'nfc_06', labels: nfc, required:true},
      {prompt: "I only think as hard as I have to.", name:'nfc_07', labels: nfc, required:true},
      {prompt: "I prefer to think about small daily projects to long term ones.", name:'nfc_08', labels: nfc, required:true},
      {prompt: "I like tasks that require little thought once I have learned them.", name:'nfc_09', labels: nfc, required:true},
      {prompt: "The idea of relying on thought to make my way to the top appeals to me.", name:'nfc_10', labels: nfc, required:true},
      {prompt: "I really enjoy a task that involves coming up with new solutions to problems.", name:'nfc_11', labels: nfc, required:true},
      {prompt: "Learning new ways to think does not excite me very much.", name:'nfc_12', labels: nfc, required:true},
      {prompt: "I prefer my life to be filled with puzzles I must solve.", name:'nfc_13', labels: nfc, required:true},
      {prompt: "The notion of thinking abstractly is appealing to me.", name:'nfc_14', labels: nfc, required:true},
      {prompt: "I would prefer a task that is intellectual, difficult, and important to one that is somewhat important but does not require much thought.", name:'nfc_15', labels: nfc, required:true},
      {prompt: "I feel relief rather than satisfaction after completing a task that requires a lot of mental effort.", name:'nfc_16', labels: nfc, required:true},
      {prompt: "It\'s enough for me that something gets the job done; I don\'t care how or why it works.", name:'nfc_17', labels: nfc, required:true},
      {prompt: "I usually end up deliberating about issues even when they do not affect me personally.", name:'nfc_18', labels: nfc, required:true}
        ],
    preamble: '<br><br>For each of the statements below, please indicate whether or not the statement is characteristic of you or of what you believe.',
    on_finish: function(data){
      jsPsych.data.addProperties({
        nfc_01: JSON.parse(data.responses)['nfc_01'],
        nfc_02: JSON.parse(data.responses)['nfc_02'],
        nfc_03: JSON.parse(data.responses)['nfc_03'],
        nfc_04: JSON.parse(data.responses)['nfc_04'],
        nfc_05: JSON.parse(data.responses)['nfc_05'],
        nfc_06: JSON.parse(data.responses)['nfc_06'],
        nfc_07: JSON.parse(data.responses)['nfc_07'],
        nfc_08: JSON.parse(data.responses)['nfc_08'],
        nfc_09: JSON.parse(data.responses)['nfc_09'],
        nfc_10: JSON.parse(data.responses)['nfc_10'],
        nfc_11: JSON.parse(data.responses)['nfc_11'],
        nfc_12: JSON.parse(data.responses)['nfc_12'],
        nfc_13: JSON.parse(data.responses)['nfc_13'],
        nfc_14: JSON.parse(data.responses)['nfc_14'],
        nfc_15: JSON.parse(data.responses)['nfc_15'],
        nfc_16: JSON.parse(data.responses)['nfc_16'],
        nfc_17: JSON.parse(data.responses)['nfc_17'],
        nfc_18: JSON.parse(data.responses)['nfc_18']
      });
    }
  };
  
  var edeq_scale = ['0 Days', '1-2 Days', '3-5 Days', '6-7 Days']
  var EDEQ1 = {
    type:'survey-likert',
    questions:[
      {prompt: "Have you been deliberately trying to limit the amount of food you eat to influence your weight or shape (whether or not you have succeeded)?", name:'edeq_1', labels: edeq_scale, required:true},
      {prompt: "Have you gone for long periods of time (e.g., 8 or more waking hours) without eating anything at all in order to influence your weight or shape?", name:'edeq_2', labels: edeq_scale, required:true},
      {prompt: "Has thinking about food, eating or calories made it very difficult to concentrate on thinfc you are interested in (such as working, following a conversation or reading)?", name:'edeq_3', labels: edeq_scale, required:true},
      {prompt: "Has thinking about your weight or shape made it very difficult to concentrate on thinfc you are interested in (such as working, following a  conversation or reading)?", name:'edeq_4', labels: edeq_scale, required:true},
      {prompt: "Have you had a definite fear that you might gain weight?", name:'edeq_5', labels: edeq_scale, required:true},
      {prompt: "Have you had a strong desire to lose weight?", name:'edeq_6', labels: edeq_scale, required:true},
      {prompt: "Have you tried to control your weight or shape by making yourself sick (vomit) or taking laxatives?", name:'edeq_7', labels: edeq_scale, required:true},
      {prompt: "Have you exercised in a driven or compulsive way as a means of controlling your weight, shape or body fat, or to burn off calories?", name:'edeq_8', labels: edeq_scale, required:true},
      {prompt: "Have you had a sense of having lost control over your eating (at the time that you were eating)?", name:'edeq_9', labels: edeq_scale, required:true},
      {prompt: "On how many of these days ( i.e. days on which you had a sense of having lost control over your eating) did you eat what other people would regard as an unusually large amount of food in one go", name:'edeq_10', labels: edeq_scale, required:true}
    ],
    preamble: '<br><br> Thank you for completing the task so far! Please answer the following series of questions as honestly as possible. <br><br> For this page of questions, on how many days OF THE PAST 7 DAYS...',
    on_finish: function(data){
      jsPsych.data.addProperties({
        EDEQ_1: JSON.parse(data.responses)['edeq_1'],
        EDEQ_2: JSON.parse(data.responses)['edeq_2'],
        EDEQ_3: JSON.parse(data.responses)['edeq_3'],
        EDEQ_4: JSON.parse(data.responses)['edeq_4'],
        EDEQ_5: JSON.parse(data.responses)['edeq_5'],
        EDEQ_6: JSON.parse(data.responses)['edeq_6'],
        EDEQ_7: JSON.parse(data.responses)['edeq_7'],
        EDEQ_8: JSON.parse(data.responses)['edeq_8'],
        EDEQ_9: JSON.parse(data.responses)['edeq_9'],
        EDEQ_10: JSON.parse(data.responses)['edeq_10']
      });
    }
  };
  
  var EDEQ2 = {
    type:'survey-likert',
    questions:[
      {prompt: "Has your weight or shape influenced how you think about (judge) yourself as a person?", name:'edeq_11', labels: ['Not at All', 'Slightly', 'Moderately','Markedly'], required:true},
      {prompt: "If you\'re paying attention please select 'Moderately' for this question.", name:'catch1', labels: ['Not at All', 'Slightly', 'Moderately','Markedly'], required:true},
      {prompt: "How dissatisfied have you been with your weight or shape?", name:'edeq_12', labels: ['Not at All', 'Slightly', 'Moderately','Markedly'], required:true}
    ],
    preamble: '<br><br> and now <b>OVER THE PAST 7 DAYS...</b>',
    on_finish: function(data){
      jsPsych.data.addProperties({
        EDEQ_11: JSON.parse(data.responses)['edeq_11'],
        catch1: JSON.parse(data.responses)['catch1'],
        EDEQ_12: JSON.parse(data.responses)['edeq_12']
      });
    }
  };
  
  var SESincome = {
    type:'survey-likert',
    questions:[
      {prompt: "Please indicate your parents\' weekly income", name:'sesparent', labels: ['< 100$', '101-200$', '201-300$', '301-400$', '401-500$', '501-600$', '601-700$', '701-800$', '801-900$', '901$ +'], required:true},
      {prompt: "Please indicate your weekly income", name:'sesstudent', labels: ['< 100$', '101-200$', '201-300$', '301-400$', '401-500$', '501-600$', '601-700$', '701-800$', '801-900$', '901$ +'], required:true},
      {prompt: "We are interested in how you perceive your life.  Think of a ladder representing where people stand in North America. At the top of the ladder are the people who are the best off -- those who have the most money, the most education, and the most respected jobs. At the bottom are the people who are the worst off -- who have the least money, least education, and the least respected jobs or no job. The higher up you are on this ladder, the closer you are to the people at the very top; the lower you are, the closer you are to the people at the very bottom. Imagine this rating scale represents the ladder. Where would you place yourself, relative to other people in North America?", name:'sesladder', labels: ['1, very low on the social ladder', '2', '3', '4', '5', '6', '7', '8', '9', '10, very high on the social ladder'], required:true},
      {prompt: "What is your native currency?", name:'sescurrency', labels: ['CAD', 'USD', 'GBP', 'AUS', 'EUR', 'Other'], required:true}
    ],
    preamble: '<br><br>For statistical purposes, we are interested in average incomes in Canadian Dollars. <br> Please make your best guess, converting your own native currency to CAD. <br> Some exchange rates are: 1 USD = 1.33 CAD, 1 AUS = 0.95 CAD, 1 EUR = 1.56 CAD, 1 GBP = 1.70 CAD',
    on_finish: function(data){
      jsPsych.data.addProperties({
        sesparent: JSON.parse(data.responses)['sesparent'],
        sesstudent: JSON.parse(data.responses)['sesstudent'],
        sesladder: JSON.parse(data.responses)['sesladder'],
        sescurrency: JSON.parse(data.responses)['sescurrency']
      });
    }
  };
  
  var EDUC = {
    type:'survey-likert',
    questions:[
      {prompt: "If you completed High School (Secondary School), what was your average grade approximately?", name:'educ_hs', labels: ['90-100 (A+)', '85-89 (A)', '80-84 (A-)', '77-79 (B+)', '73-76 (B)', '70-72 (B-)', '67-70 (C+)', '63-66 (C)', '60-62 (C-)', '57-59 (D+)', '53-56 (D)', '50-52 (D-)', '< 50 (F)', 'I did not complete High School'], required:true},
      {prompt: "If you completed studies at a non-university college (or post-secondary institution), or CEGEP what was your average grade approximately?", name:'educ_ce', labels: ['90-100 (A+)', '85-89 (A)', '80-84 (A-)', '77-79 (B+)', '73-76 (B)', '70-72 (B-)', '67-70 (C+)', '63-66 (C)', '60-62 (C-)', '57-59 (D+)', '53-56 (D)', '50-52 (D-)', '< 50 (F)', 'N/A'], required:false}
    ],
    preamble: '<br><br> Here are some additional questions about your education background',
    on_finish: function(data){
      jsPsych.data.addProperties({
        educ_hs: JSON.parse(data.responses)['educ_hs'],
        educ_ce: JSON.parse(data.responses)['educ_ce']
      });
    }
  };
  
  var kirby = {
    type: 'survey-multi-choice',
    questions: [
      {prompt: "Would you rather have...", options: ['$30 tonight', '$85 in 14 days'],  name:'kirby01', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$40 tonight', '$55 in 25 days'],  name:'kirby02', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$67 tonight', '$85 in 35 days'],  name:'kirby03', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$34 tonight', '$35 in 43 days'],  name:'kirby04', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$15 tonight', '$35 in 10 days'],  name:'kirby05', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$32 tonight', '$55 in 20 days'],  name:'kirby06', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$83 tonight', '$85 in 35 days'],  name:'kirby07', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$21 tonight', '$30 in 75 days'],  name:'kirby08', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$48 tonight', '$55 in 45 days'],  name:'kirby09', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$40 tonight', '$65 in 70 days'],  name:'kirby10', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$25 tonight', '$35 in 25 days'],  name:'kirby11', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$65 tonight', '$75 in 50 days'],  name:'kirby12', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$24 tonight', '$55 in 10 days'],  name:'kirby13', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$30 tonight', '$35 in 20 days'],  name:'kirby14', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$53 tonight', '$55 in 55 days'],  name:'kirby15', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$47 tonight', '$60 in 50 days'],  name:'kirby16', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$40 tonight', '$70 in 20 days'],  name:'kirby17', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$50 tonight', '$80 in 70 days'],  name:'kirby18', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$45 tonight', '$70 in 35 days'],  name:'kirby19', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$27 tonight', '$30 in 35 days'],  name:'kirby20', required: true, horizontal: true,},
      {prompt: "Would you rather have...", options: ['$16 tonight', '$30 in 35 days'],  name:'kirby21', required: true, horizontal: true,}
    ],
      preamble: '<br><br> Here are some scenarios where you can imagine picking between having one monetary reward now, or a greater reward later. <br> Please select which option you would prefer for each choice.',
      on_finish: function(data){
          jsPsych.data.addProperties({
          kirby01: JSON.parse(data.responses)['kirby01'],
          kirby02: JSON.parse(data.responses)['kirby02'],
          kirby03: JSON.parse(data.responses)['kirby03'],
          kirby04: JSON.parse(data.responses)['kirby04'],
          kirby05: JSON.parse(data.responses)['kirby05'],
          kirby06: JSON.parse(data.responses)['kirby06'],
          kirby07: JSON.parse(data.responses)['kirby07'],
          kirby08: JSON.parse(data.responses)['kirby08'],
          kirby09: JSON.parse(data.responses)['kirby09'],
          kirby10: JSON.parse(data.responses)['kirby10'],
          kirby11: JSON.parse(data.responses)['kirby11'],
          kirby12: JSON.parse(data.responses)['kirby12'],
          kirby13: JSON.parse(data.responses)['kirby13'],
          kirby14: JSON.parse(data.responses)['kirby14'],
          kirby15: JSON.parse(data.responses)['kirby15'],
          kirby16: JSON.parse(data.responses)['kirby16'],
          kirby17: JSON.parse(data.responses)['kirby17'],
          kirby18: JSON.parse(data.responses)['kirby18'],
          kirby19: JSON.parse(data.responses)['kirby19'],
          kirby20: JSON.parse(data.responses)['kirby20'],
          kirby21: JSON.parse(data.responses)['kirby21']
      });
    }
  };
  
  var bsqr_scale = ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often', 'Always']
  var BSQR = {
    type:'survey-likert',
    questions:[
      {prompt: "Have you been so worried about your shape that you have been feeling that you ought to diet?", name:'bsqr_1', labels: bsqr_scale, required:true},
      {prompt: "Has being with thin people made you feel self-conscious about your shape?", name:'bsqr_2', labels: bsqr_scale, required:true},
      {prompt: "Have you ever noticed the shape of other people and felt that your own shape compared unfavourably?", name:'bsqr_3', labels: bsqr_scale, required:true},
      {prompt: "Has being undressed, such as when taking a bath, made you feel fat?", name:'bsqr_4', labels: bsqr_scale, required:true},
      {prompt: "Has eating sweets, cakes, or other high calorie food made you feel fat?", name:'bsqr_5', labels: bsqr_scale, required:true},
      {prompt: "Have you felt excessively large and rounded?", name:'bsqr_6', labels: bsqr_scale, required:true},
      {prompt: "Have you felt ashamed of your body?", name:'bsqr_7', labels: bsqr_scale, required:true},
      {prompt: "Has worry about your shape made you diet?", name:'bsqr_8', labels: bsqr_scale, required:true},
      {prompt: "Have you thought that you are the shape you are because you lack self-control?", name:'bsqr_9', labels: bsqr_scale, required:true},
      {prompt: "Have you worried about other people seeing rolls of fat around your waist and stomach?", name:'bsqr_10', labels: bsqr_scale, required:true},
      {prompt: "Have you felt that it is not fair that other people are thinner than you?", name:'bsqr_11', labels: bsqr_scale, required:true},
      {prompt: "If you\'re paying attention to this question, please select 'Rarely'. ", name:'catch2', labels: bsqr_scale, required:true},
      {prompt: "Has seeing your reflection (e.g., in a mirror or shop window) made you feel bad about your shape?", name:'bsqr_12', labels: bsqr_scale, required:true},
      {prompt: "Have you been particularly self-conscious about your shape when in the company of other people?", name:'bsqr_13', labels: bsqr_scale, required:true},
      {prompt: "Has worry about your shape made you feel you ought to exercise?", name:'bsqr_14', labels: bsqr_scale, required:true}
    ],
    preamble: '<br><br> We would like to know how you have been feeling about your appearance over <b>THE PAST TWO WEEKS.</b> <br> Please read each question and select the appropriate option. Please answer all the questions.',
    on_finish: function(data){
      jsPsych.data.addProperties({
        BSQR_1: JSON.parse(data.responses)['bsqr_1'],
        BSQR_2: JSON.parse(data.responses)['bsqr_2'],
        BSQR_3: JSON.parse(data.responses)['bsqr_3'],
        BSQR_4: JSON.parse(data.responses)['bsqr_4'],
        BSQR_5: JSON.parse(data.responses)['bsqr_5'],
        BSQR_6: JSON.parse(data.responses)['bsqr_6'],
        BSQR_7: JSON.parse(data.responses)['bsqr_7'],
        BSQR_8: JSON.parse(data.responses)['bsqr_8'],
        BSQR_9: JSON.parse(data.responses)['bsqr_9'],
        BSQR_10: JSON.parse(data.responses)['bsqr_10'],
        BSQR_11: JSON.parse(data.responses)['bsqr_11'],
        catch2: JSON.parse(data.responses)['catch2'],
        BSQR_12: JSON.parse(data.responses)['bsqr_12'],
        BSQR_13: JSON.parse(data.responses)['bsqr_13'],
        BSQR_14: JSON.parse(data.responses)['bsqr_14']
      });
    }
  };
  
  var bsi_scale = ['Not at All', 'A Little Bit', 'Moderately', 'Quite a Bit', 'Extremely']
  var BSI = {
    type:'survey-likert',
    questions:[
      {prompt: "Faintness or dizzinnes", name:'bsi_1', labels: bsi_scale, required:true},
      {prompt: "Feeling no interest in things", name:'bsi_2', labels: bsi_scale, required:true},
      {prompt: "Nervousness or shakiness inside", name:'bsi_3', labels: bsi_scale, required:true},
      {prompt: "Pains in heart or chest", name:'bsi_4', labels: bsi_scale, required:true},
      {prompt: "Feeling lonely", name:'bsi_5', labels: bsi_scale, required:true},
      {prompt: "Feeling tense or keyed up", name:'bsi_6', labels: bsi_scale, required:true},
      {prompt: "Nausea or upset stomach", name:'bsi_7', labels: bsi_scale, required:true},
      {prompt: "Feeling blue", name:'bsi_8', labels: bsi_scale, required:true},
      {prompt: "If you\'re paying attention, please select 'Not at All' for this question.", name:'catch3', labels: bsi_scale, required:true},
      {prompt: "Suddenly scared for no reason", name:'bsi_9', labels: bsi_scale, required:true},
      {prompt: "Trouble catching your breath", name:'bsi_10', labels: bsi_scale, required:true},
      {prompt: "Feelings of worthlessness", name:'bsi_11', labels: bsi_scale, required:true},
      {prompt: "Spells of terror or panic", name:'bsi_12', labels: bsi_scale, required:true},
      {prompt: "Numbness or tingling in parts of your body", name:'bsi_13', labels: bsi_scale, required:true},
      {prompt: "Feeling hopeless about the future", name:'bsi_14', labels: bsi_scale, required:true},
      {prompt: "Feeling so restless you couldn\'t sit still", name:'bsi_15', labels: bsi_scale, required:true},
      {prompt: "Feeling weak in parts of your body", name:'bsi_16', labels: bsi_scale, required:true},
      {prompt: "Thoughts of ending your life", name:'bsi_17', labels: bsi_scale, required:true},
      {prompt: "Feeling fearful", name:'bsi_18', labels: bsi_scale, required:true}
    ],
    preamble: '<br><br> Please read each sentence carefully, and choose the option that best describes how much that problem has distressed or bothered you during the <b>PAST 7 DAYS INCLUDING TODAY.</b>',
    on_finish: function(data){
      jsPsych.data.addProperties({
        BSI_1: JSON.parse(data.responses)['bsi_1'],
        BSI_2: JSON.parse(data.responses)['bsi_2'],
        BSI_3: JSON.parse(data.responses)['bsi_3'],
        BSI_4: JSON.parse(data.responses)['bsi_4'],
        BSI_5: JSON.parse(data.responses)['bsi_5'],
        BSI_6: JSON.parse(data.responses)['bsi_6'],
        BSI_7: JSON.parse(data.responses)['bsi_7'],
        BSI_8: JSON.parse(data.responses)['bsi_8'],
        catch3: JSON.parse(data.responses)['catch3'],
        BSI_9: JSON.parse(data.responses)['bsi_9'],
        BSI_10: JSON.parse(data.responses)['bsi_10'],
        BSI_11: JSON.parse(data.responses)['bsi_11'],
        BSI_12: JSON.parse(data.responses)['bsi_12'],
        BSI_13: JSON.parse(data.responses)['bsi_13'],
        BSI_14: JSON.parse(data.responses)['bsi_14'],
        BSI_15: JSON.parse(data.responses)['bsi_15'],
        BSI_16: JSON.parse(data.responses)['bsi_16'],
        BSI_17: JSON.parse(data.responses)['bsi_17'],
        BSI_18: JSON.parse(data.responses)['bsi_18']
      });
    }
  };
  
  var gender_options = ["Female", "Male", "Transgender", "Non-Binary"];
  var ethnicity_options = ["American Indian or Alaskan Native ", "Native Hawaiian or Other Pacific Islander ", "Asian ", "Hispanic or Latino or Spanish Origin of any race ", "Black or African American ", "Middle Eastern or North African ", "White or Caucasian ", "I would rather not answer"];
  var education_options = ["Elementary School ", "Junior High School ", "High School ", "CEGEP, non-university college, trade school or equivalent ", "Undergraduate degree ", "Graduate degree ", "Professional degree (i.e., Law School, Medical School, Dentistry)"];
  var school_options = ["Yes, but not at a university ", "Yes, Undergraduate studies ", "Yes, Graduate studies ", "No, currently not in school "];
  var demo2 = {
    type: 'survey-multi-choice',
    questions: [
      {prompt: "What is your gender?", options: gender_options, name:'gender', required: true, horizontal: false,},
      {prompt: "What is your ethnicity?", options: ethnicity_options, name:'ethnicity', required: true, horizontal: false,}, // Adapted from https://ir.aa.ufl.edu/surveys/race-and-ethnicity-survey/
      {prompt: "Have you been diagnosed with a mental health condition over the past 6 months?", options: ['Yes' + '&nbsp', 'No' + '&nbsp &nbsp'], name:'mental_check', required: true, horizontal: false,},
      {prompt: "What is your highest level of education?", name:'educ_l', options: education_options, required: true, horizontal: false,},
      {prompt: "Are you currently attending school?", name:'educ_c', options: school_options, required: false}
    ],
      preamble: '<br><br> Here are some more demographic questions that we will use for statistical purposes',
      on_finish: function(data){
          jsPsych.data.addProperties({
          gender: JSON.parse(data.responses)['gender'],
          ethnicity: JSON.parse(data.responses)['ethnicity'],
          mental_check: JSON.parse(data.responses)['mental_check'],
          educ_l: JSON.parse(data.responses)['educ_l'],
          educ_c: JSON.parse(data.responses)['educ_c']
      });
    }
  };
  
  var SOC = {
    type:'survey-likert',
    questions:[
      {prompt: "How many times have you used social media in the past month?", name:'soc_1', labels: ['Less than once a week', 'Less than once a day', 'Two to three times a day','Four to five times a day', 'At least six times a day'], required:true},
      {prompt: "How much time are you online on social media every day?", name:'soc_2', labels: ['Less than 30 minutes', 'Between 31 minutes and 2 hours', 'Between 2 and 6 hours', 'Between 6 and 12 hours', '12 hours or more'], required:true},
      {prompt: "How much time are you actually spending on social media every day?", name:'soc_3', labels: ['Less than 30 minutes', 'Between 31 minutes to 60 minutes', 'Between 1 and 2 hours', 'Between 2 and 4 hours', '5 hours or more'], required:true},
      {prompt: "How many years have passed since you became active on social media?", name:'soc_4', labels: ['Less than 3 years', 'Between 4 and 5 years', 'Between 6 and 7 years', 'Between 8 and 9 years', '10 or more years'], required:true},
      {prompt: "How many friends do you have on social media?", name:'soc_5', labels: ['Less than 50 friends', '51 to 100 friends', '101 to 150 friends', '151 to 200 friends', 'More than 200 friends'], required:true}
    ],
    preamble: '<br><br> Below are some questions concerning the your social media habits. <br><br> For these questions, consider all your activity on social media platforms as a whole over THE PAST 6 MONTHS.',
    on_finish: function(data){
      jsPsych.data.addProperties({
        soc_1: JSON.parse(data.responses)['soc_1'],
        soc_2: JSON.parse(data.responses)['soc_2'],
        soc_3: JSON.parse(data.responses)['soc_3'],
        soc_4: JSON.parse(data.responses)['soc_4'],
        soc_5: JSON.parse(data.responses)['soc_5']
      });
    }
  };
  
  var screenweek = {
    type: 'survey-text',
    questions: [
      {prompt: "On the average weekday, how much time do you use television as the primary activity?", placeholder: "HH:MM, ex: 1:15", name: 'tv_01', required:true},
      {prompt: "On the average weekday, how much time do you use TV-connected devices (e.g. streaming devices, video game consoles) as the primary activity?", placeholder: "HH:MM", name: 'dev_01', required:true},
      {prompt: "On the average weekday, how much time do you use your laptop or computer as the primary activity?", placeholder: "HH:MM", name: 'lap_01', required:true},
      {prompt: "On the average weekday, how much time do you use your smartphone as the primary activity?", placeholder: "HH:MM", name: 'pho_01', required:true},
      {prompt: "On the average weekday, how much time do you use your tablet as the primary activity?", placeholder: "HH:MM", name: 'tab_01', required:true}
    ],
    preamble: '<br><br> The next few sets of questions are about your time looking at screens. <b>Please enter your responses as "HH:MM"</b>. <br> Thinking of an <b>average WEEKDAY</b> (from when you wake up until you go to sleep) OVER THE PAST 6 MONTHS, how much time do you spend using each of the following types of <b>screen as the primary activity</b>? <br> Please answer using both HOURS and MINUTES like so: 02:45 for Two hours and Forty-Five minutes. <br> If you spend no time on an activity, you may enter 00:00. <br> For the following set of questions, primary activity is defined as the main activity you are engaged in rather than using a television/other screen in the background while performing another activity such as cooking or exercising.',
    on_finish: function(data){
      jsPsych.data.addProperties({
        TV01: JSON.parse(data.responses)['tv_01'],
        DEV01: JSON.parse(data.responses)['dev_01'],
        LAP01: JSON.parse(data.responses)['lap_01'],
        PHO01: JSON.parse(data.responses)['pho_01'],
        TAB01: JSON.parse(data.responses)['tab_01']
      });
    }
  };
  
  var screennight = {
    type: 'survey-text',
    questions: [
      {prompt: "On the average weeknight, how much time do you use television as the primary activity?", placeholder: "HH:MM, ex: 1:15", name: 'tv_02', required:true},
      {prompt: "On the average weeknight, how much time do you use TV-connected devices (e.g. streaming devices, video game consoles) as the primary activity?", placeholder: "HH:MM", name: 'dev_02', required:true},
      {prompt: "On the average weeknight, how much time do you use your laptop or computer as the primary activity?", placeholder: "HH:MM", name: 'lap_02', required:true},
      {prompt: "On the average weeknight, how much time do you use your smartphone as the primary activity?", placeholder: "HH:MM", name: 'pho_02', required:true},
      {prompt: "On the average weeknight, how much time do you use your tablet as the primary activity?", placeholder: "HH:MM", name: 'tab_02', required:true}
    ],
    preamble: '<br><br> Thinking of an <b>average WEEKNIGHT</b> (from when you return from work until you go to sleep) OVER THE PAST 6 MONTHS, how much time do you spend using each of the following types of screen <b>as the primary activity</b>? <br> Please answer using both HOURS and MINUTES like so: 02:45 for Two hours and Forty-Five minutes. <br> If you spend no time on an activity, you may enter 00:00. <br> For the following set of questions, primary activity is defined as the main activity you are engaged in rather than using a television/other screen in the background while performing another activity such as cooking or exercising.',
    on_finish: function(data){
      jsPsych.data.addProperties({
        TV02: JSON.parse(data.responses)['tv_02'],
        DEV02: JSON.parse(data.responses)['dev_02'],
        LAP02: JSON.parse(data.responses)['lap_02'],
        PHO02: JSON.parse(data.responses)['pho_02'],
        TAB02: JSON.parse(data.responses)['tab_02']
      });
    }
  };
  
  var screenwknd = {
    type: 'survey-text',
    questions: [
      {prompt: "On the average weekend day, how much time do you use television as the primary activity?", placeholder: "HH:MM, ex: 1:15", name: 'tv_03', required:true},
      {prompt: "On the average weekend day, how much time do you use TV-connected devices (e.g. streaming devices, video game consoles) as the primary activity?", placeholder: "HH:MM", name: 'dev_03', required:true},
      {prompt: "On the average weekend day, how much time do you use your laptop or computer as the primary activity?", placeholder: "HH:MM", name: 'lap_03', required:true},
      {prompt: "On the average weekend day, how much time do you use your smartphone as the primary activity?", placeholder: "HH:MM", name: 'pho_03', required:true},
      {prompt: "On the average weekend day, how much time do you use your tablet as the primary activity?", placeholder: "HH:MM", name: 'tab_03', required:true}
    ],
    preamble: '<br><br> Thinking of an <b>average WEEKEND DAY</b> (Saturday or Sunday, from when you wake up until you go to sleep) OVER THE PAST 6 MONTHS, how much time do you spend <b>using each of the following types of screen as the primary activity</b>? <br> Please answer using both HOURS and MINUTES like so: 02:45 for Two hours and Forty-Five minutes. <br> If you spend no time on an activity, you may enter 00:00. For the following set of questions, primary activity is defined as the main activity you are engaged in rather than using a television/other screen in the background while performing another activity such as cooking or exercising.',
    on_finish: function(data){
      jsPsych.data.addProperties({
        TV03: JSON.parse(data.responses)['tv_03'],
        DEV03: JSON.parse(data.responses)['dev_03'],
        LAP03: JSON.parse(data.responses)['lap_03'],
        PHO03: JSON.parse(data.responses)['pho_03'],
        TAB03: JSON.parse(data.responses)['tab_03']
      });
    }
  };
  
  var screensec = {
    type: 'survey-text',
    questions: [
      {prompt: "Thinking about a regular weekday (24 hours), on average, OVER THE PAST 6 MONTHS, how many hours over the course of the whole day are you exposed to <b>background screen use</b>? For example, if you exercise in the morning for one hour while watching the TV news, you use your smartphone for one hour while eating lunch and an additional 30 minutes while eating dinner, you would estimate that you are exposed to 2 hours and 30 minutes of background screen use per day.", placeholder: "HH:MM", name: 'Wedsec', required:true},
      {prompt: "Now we want to ask about background screen use during the evening specifically. On average, how many hours per evening (24 hours) (Monday through Friday) OVER THE PAST 6 MONTHS, are you exposed to <b>background screen use</b> from when you return from work until you go to sleep?", placeholder: "HH:MM", name: 'Wnisec', required:true},
      {prompt: "Now we want to ask about background screen use during the weekend. Thinking about a regular weekend day (24 hours) (Saturday or Sunday), OVER THE PAST 6 MONTHS, on average, how many hours over the course of the whole day (from when you wake up until you go to sleep) are you exposed to <b>background screen use</b>?", placeholder: "HH:MM", name: 'Wknsec', required:true}
    ],
    preamble: '<br><br> Thank you! Only three last questions about screen time. <br> For the following set of questions, background screen use is defined as the use of a television or another screen near you while performing other activities such as exercising, cooking, and interacting with family/friends. <br> Please answer each question using both HOURS and MINUTES like so: 02:45 for Two hours and Forty-Five minutes. <br> If you spend no time on an activity, you may enter 00:00.',
    on_finish: function(data){
      jsPsych.data.addProperties({
        WEDSEC: JSON.parse(data.responses)['Wedsec'],
        WNISEC: JSON.parse(data.responses)['Wnisec'],
        WKNSEC: JSON.parse(data.responses)['Wknsec']
      });
    }
  };