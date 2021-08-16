var timeline = [];

var preload = {
    type: 'preload',
    show_progress_bar: true,
    images: ['T300.png',	'H300.png',
'T290.png',	'H290.png',
'T280.png',	'H280.png',
'T270.png',	'H270.png',
'T260.png',	'H260.png',
'T250.png',	'H250.png',
'T240.png',	'H240.png',
'T230.png',	'H230.png',
'T220.png',	'H220.png',
'T210.png',	'H210.png',
'T200.png',	'H200.png',
'T190.png',	'H190.png',
'T180.png',	'H180.png',
'T170.png',	'H170.png',
'T160.png',	'H160.png',
'T150.png',	'H150.png',
'T140.png',	'H140.png',
'T130.png',	'H130.png',
'T120.png',	'H120.png',
'T110.png',	'H110.png',
'T100.png',	'H100.png',
'T090.png',	'H090.png',
'T080.png',	'H080.png',
'T070.png',	'H070.png',
'T060.png',	'H060.png',
'T050.png',	'H050.png',
'T040.png',	'H040.png',
'T030.png',	'H030.png',
'T020.png',	'H020.png',
'T010.png',	'H010.png',
'N000.png']
};

//participant id
var participantCode = jsPsych.randomization.randomID(8); //random alpha-numeric string
jsPsych.data.addProperties({subject: participantCode}); // add participant code to data

//the images
var mbodies =['T300.png',	'H300.png',
'T290.png',	'H290.png',
'T280.png',	'H280.png',
'T270.png',	'H270.png',
'T260.png',	'H260.png',
'T250.png',	'H250.png',
'T240.png',	'H240.png',
'T230.png',	'H230.png',
'T220.png',	'H220.png',
'T210.png',	'H210.png',
'T200.png',	'H200.png',
'T190.png',	'H190.png',
'T180.png',	'H180.png',
'T170.png',	'H170.png',
'T160.png',	'H160.png',
'T150.png',	'H150.png',
'T140.png',	'H140.png',
'T130.png',	'H130.png',
'T120.png',	'H120.png',
'T110.png',	'H110.png',
'T100.png',	'H100.png',
'T090.png',	'H090.png',
'T080.png',	'H080.png',
'T070.png',	'H070.png',
'T060.png',	'H060.png',
'T050.png',	'H050.png',
'T040.png',	'H040.png',
'T030.png',	'H030.png',
'T020.png',	'H020.png',
'T010.png',	'H010.png',
'N000.png'];

var totalSeen = 1; //for logging the total number of bodies seen and presenting it to the participant

var demo1 = {
  type: 'survey-text',
  questions: [
    {prompt: "What is your unique Prolific ID?", name:'prolID', required:true},
    {prompt: "What is your age in years?", name:'age', required:true},
    {prompt: "For statistical purposes, please enter your weight in <b>pounds (lbs)</b> (1 lbs = 0.45kg = 0.07 stone). For instance, if you weigh 150lbs, simply type 150.", name:'weight', required:true},
    {prompt: "For statistical purposes, please enter your height in <b>feet and inches (ft.in.)</b> (1 foot = 0.3 meters). For instance, if you are 6 feet 2 inches tall, simply type 6.2.", name:'height', required:true},
    {prompt: "Do you have a mental health issue, health condition, or sensory disorder? If so, please specify. If this does not apply to you, please enter N/A", name:'mh', required:true},
  ],
  button_label: 'Start the task!',
  preamble: 'Welcome! Here are some questions about your background. <br> Please answer the following demographic questions as honestly as possible. <br> All of your responses here and on the task are strictly confidential.'
};

var intro = {
    type: 'instructions',
    pages: [
        'Great, thanks! In this short study, you\'ll be rating a series of male bodies.',
        'Please use the sliding scales to rate the bodies you see. <br> The labels at either end of the slider represent the two ends of each scale. <br> Please drag the slider toward the word you think best describes the body you see.',
        'If you feel that the body you see very strongly fits one word, drag the slider all the way towards that word. <br> If you feel that the body you see fits somewhere in the middle of the scale, you can drag the slider anywhere in between.',
        'You will have to move each slider at least once before you can move on. <br> The order of the sliders will also change, so make sure you pay attention to the labels! <br> Please be as honest as possible in your judgements, there are no right or wrong answers. <br><br> That\'s it for the instructions. <br> You can navigate through these instructions again if you need, otherwise, click <b>Next</b> to start rating!'
    ],
    show_clickable_nav: true
}

var n000 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="N000.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "N000";
      console.log(data);
      totalSeen += 1;
    }
  };

var h010 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H010.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H010";
      console.log(data);
      totalSeen += 1;
    }
  };

var h020 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H020.png"></img>';},    
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H020";
      console.log(data);
      totalSeen += 1;
    }
  };

var h030 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H030.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H030";
      console.log(data);
      totalSeen += 1;
    }
  };

var h040 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H040.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H040";
      console.log(data);
      totalSeen += 1;
    }
  };

var h050 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H050.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H050";
      console.log(data);
      totalSeen += 1;
    }
  };

var h060 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H060.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H060";
      console.log(data);
      totalSeen += 1;
    }
  };

var h070 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H070.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H070";
      console.log(data);
      totalSeen += 1;
    }
  };
  
var h080 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H080.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H080";
      console.log(data);
      totalSeen += 1;
    }
  };

var h090 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H090.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H090";
      console.log(data);
      totalSeen += 1;
    }
  };

var h100 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H100.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H100";
      console.log(data);
      totalSeen += 1;
    }
  };

var h110 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H110.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H110";
      console.log(data);
      totalSeen += 1;
    }
  };

var h120 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H120.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H120";
      console.log(data);
      totalSeen += 1;
    }
  };

var h130 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H130.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H130";
      console.log(data);
      totalSeen += 1;
    }
  };

var h140 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H140.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H140";
      console.log(data);
      totalSeen += 1;
    }
  };

var h150 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H150.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H150";
      console.log(data);
      totalSeen += 1;
    }
  };

var h160 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H160.png"></img>';},    
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H160";
      console.log(data);
      totalSeen += 1;
    }
  };

var h170 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H170.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H170";
      console.log(data);
      totalSeen += 1;
    }
  };

var h180 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H180.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H180";
      console.log(data);
      totalSeen += 1;
    }
  };

var h190 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H190.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H190";
      console.log(data);
      totalSeen += 1;
    }
  };

var h200 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H200.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H200";
      console.log(data);
      totalSeen += 1;
    }
  };

var h210 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H210.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H210";
      console.log(data);
      totalSeen += 1;
    }
  };

var h220 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H220.png"></img>';},    
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H220";
      console.log(data);
      totalSeen += 1;
    }
  };

var h230 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H230.png"></img>';},
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H230";
      console.log(data);
      totalSeen += 1;
    }
  };

var h240 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H240.png"></img>';},    
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H240";
      console.log(data);
      totalSeen += 1;
    }
  };

var h250 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H250.png"></img>';},   
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H250";
      console.log(data);
      totalSeen += 1;
    }
  };

var h260 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H260.png"></img>';},   
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H260";
      console.log(data);
      totalSeen += 1;
    }
  };

var h270 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H270.png"></img>';},   
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H270";
      console.log(data);
      totalSeen += 1;
    }
  };

var h280 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H280.png"></img>';},   
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H280";
      console.log(data);
      totalSeen += 1;
    }
  };

var h290 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H290.png"></img>';},   
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H290";
      console.log(data);
      totalSeen += 1;
    }
  };

var h300 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="H300.png"></img>';},   
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "H300";
      console.log(data);
      totalSeen += 1;
    }
  };

var t300 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T300.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T300";
      console.log(data);
      totalSeen += 1;
    }
  };

var t200 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T200.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T200";
      console.log(data);
      totalSeen += 1;
    }
  };

var t210 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T210.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T210";
      console.log(data);
      totalSeen += 1;
    }
  };

var t220 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T220.png"></img>';},      require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T220";
      console.log(data);
      totalSeen += 1;
    }
  };

var t230 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T230.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T230";
      console.log(data);
      totalSeen += 1;
    }
  };

var t240 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T240.png"></img>';},
		require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T240";
      console.log(data);
      totalSeen += 1;
    }
  };

var t250 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T250.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T250";
      console.log(data);
      totalSeen += 1;
    }
  };

var t260 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T260.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T260";
      console.log(data);
      totalSeen += 1;
    }
  };

var t270 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T270.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T270";
      console.log(data);
      totalSeen += 1;
    }
  };

var t280 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T280.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T280";
      console.log(data);
      totalSeen += 1;
    }
  };

var t290 = {
    type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
    preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T290.png"></img>';},  
    require_movement: true,
    randomize_question_order: true,
    slider_width: 500,
    on_finish: function(data) {
      var ratings = JSON.parse(data.responses);
      data.attractiveness = ratings.attractiveness;
      data.beauty = ratings.beauty;
      data.harmony = ratings.harmony;
      data.weight = ratings.weight;
      data.img = "T290";
      console.log(data);
      totalSeen += 1;
    }
  };

var t100 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T100.png"></img>';},  
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T100";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t110 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T110.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T110";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t120 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T120.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T120";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t130 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T130.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T130";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t140 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T140.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T140";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t150 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T150.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T150";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t160 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T160.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T160";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t170 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T170.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T170";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t180 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T180.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T180";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t190 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T190.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T190";
        console.log(data);
        totalSeen += 1;
      }
    };

var t000 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T000.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T000";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t010 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T010.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T010";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t020 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T020.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T020";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t030 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T030.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T030";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t040 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T040.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T040";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t050 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T050.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T050";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t060 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T060.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T060";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t070 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T070.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T070";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t080 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T080.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T080";
        console.log(data);
        totalSeen += 1;
      }
    };

  var t090 = {
      type: 'multiple-slider',
    questions: [
      {prompt: '', name: 'attractiveness', labels: ["Repulsive", "Attractive"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'beauty', labels: ["Ugly", "Beautiful"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'harmony', labels: ["Deformed", "Harmonious"], slider_start: 50, min: 0, max: 100, step: 1},
      {prompt: '', name: 'weight', labels: ["Fat", "Thin"], slider_start: 50, min: 0, max: 100, step: 1},
    ],
      preamble: function(){return "<p>Please use the sliders below to rate this man\'s body.</p>" +
				  "<p>This is body <b>"+totalSeen+" out of 61 </b></p>" +
				  '<img src="T090.png"></img>';},
      require_movement: true,
      randomize_question_order: true,
      slider_width: 500,
      on_finish: function(data) {
        var ratings = JSON.parse(data.responses);
        data.attractiveness = ratings.attractiveness;
        data.beauty = ratings.beauty;
        data.harmony = ratings.harmony;
        data.weight = ratings.weight;
        data.img = "T090";
        console.log(data);
        totalSeen += 1;
      }
    };

//Make the trials + shuffle
var male_bodies = [h300, h290, h280, h270, h260, h250, h240, h230, h220, h210, h200, h190, h180, h170,
h160, h150, h140, h130, h120, h110, h100, h090, h080, h070, h060, h050, h040, h030, h020, h010, n000,
t300, t290, t280, t270, t260, t250, t240, t230, t220, t210, t200, t190, t180, t170, t160, t150,
t140, t130, t120, t110, t100, t090, t080, t070, t060, t050, t040, t030, t020, t010];

var experiment = jsPsych.randomization.shuffle(male_bodies);

mens_bodies = {
  timeline: experiment,
};

// consent

var consent = {
  type:'external-html',
  url: "consent.html",
  cont_btn: 'agree',
};

// debrief 
var debriefchoice = '';
var checkdebrief = function(elem) {
  if (document.getElementById('agree').checked) {
    debriefchoice = 'agree';
    return true;
  }
  else {
    alert("Your data will not be included in the analyses.");
    debriefchoice = 'decline';
    return true;
  }
  return false;
};

var debrief = {
  type:'external-html',
  url: "debriefing.html",
  cont_btn: 'continue',
  check_fn: checkdebrief,
  on_finish: function(){
    jsPsych.data.addProperties({debrief: debriefchoice});
  }
};

timeline.push(preload);
timeline.push(consent);
timeline.push(demo1);
timeline.push(intro);
timeline.push(mens_bodies);
timeline.push(debrief);

jsPsych.init({
timeline: timeline,
preload_images: true,
show_preload_progress_bar: true,
		on_finish: function(data){
			//jsPsych.data.get().localSave('csv','TEST_PICCBI_'+subject_id+'_'+cond+'.csv'); // download locally if piloting
			document.body.innerHTML = '<p> Please wait. You will be redirected back to Prolific in a few moments.</p>'
      setTimeout(function () { location.href = "https://app.prolific.co/submissions/complete?cc=29EA2C8A" }, 10000) // send back to Prolific once study is online
		}
});
