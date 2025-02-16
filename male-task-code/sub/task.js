/* init connection with pavlovia.org */
var pavlovia_init = {
	type: "pavlovia",
	command: "init"
};

var pavlovia_finish = {
	type: "pavlovia",
	command: "finish"
	};

var timeline = [pavlovia_init, consent, fullscreen, welcome, demo1, demo2, health, SOC, screenweek, screennight, screenwknd, screensec, SESincome, EDUC, NFC, kirby, selfchoice, selfjudge, i1, ptrials, i2]
for (i in _.range(numblocks)){
  timeline.push(block);
  timeline.push(trials);
};

timeline.push(end, selfjudge2, instself, selfchoice2, EDEQ1, EDEQ2, BSQR, BSI, debrief, pavlovia_finish);

var allimages = images;
// run
  jsPsych.init({
    timeline: timeline,
    preload_images: allimages,
    show_preload_progress_bar: true,
		on_finish: function(data){
			//jsPsych.data.get().localSave('csv','TEST_PICCBI_'+subject_id+'_'+cond+'.csv'); // download locally if piloting
			//document.body.innerHTML = '<p> Thank you for completing the study! You can now close this page.</p>'
			document.body.innerHTML = '<p> Please wait. You will be redirected back to Prolific in a few moments.</p>'
      setTimeout(function () { location.href = "https://app.prolific.co/submissions/complete?cc=73BC472D" }, 10000) // send back to Prolific once study is online
		}
});
