const default_break_time = 5;
const default_work_time = 25;
const default_pomodoro_qnt = 4;
const text_work = "It's time to work!";
const text_break = "It's break time!";

const pomodoro = document.getElementById("quantity-pomodoro");
const pomodoros_number = document.getElementById("pomodoros");
const work_time = document.getElementById("work-time");
const break_time = document.getElementById("break-time");
const text_timer = document.getElementById("text-timer");
const minutes_timer = document.getElementById("minutes");
const seconds_timer = document.getElementById("seconds");
const textarea = document.querySelector("textarea");

let pomodoro_qnt = default_pomodoro_qnt;
let work_qnt = default_work_time;
let break_qnt = default_break_time;
let minutes_work = work_qnt;
let seconds_work = 0;
let minutes_break = break_qnt;
let seconds_break = 0;
let pomodoros_count = pomodoro_qnt;
let on_work = false;
let on_break = false;
let on_play = false;
let paused = false;
let id_interval;
let id_interval_controls;



function correct_time(time) {
	return (time < 10) ? `0${time}` : time;
}

function timer() {
	if (paused) {
		clearInterval(id_interval);
	} else {
		if (on_work) {
			seconds_work--;

			if (seconds_work < 0) {
				seconds_work = 59;
				minutes_work--;
			}

			if (minutes_work >= 0) {
				minutes_timer.innerText = correct_time(minutes_work);
				seconds_timer.innerText = correct_time(seconds_work);
			} else {
				pomodoros_count--;

				minutes_work = work_qnt;
				seconds_work = 0;
				on_work = false;
				on_break = true;

				text_timer.innerText = text_break;
				minutes_timer.innerText = correct_time(minutes_break);
				seconds_timer.innerText = correct_time(seconds_break);
				textarea.style.color = "darkslateblue";

				if (pomodoros_count < 1) {
					let sound = new Audio("assets/end.mp3");
					sound.play();
					stop();
					text_timer.innerText = "Take a long break! Like 15~30 minutes";
					textarea.style.color = "whitesmoke";
					textarea.removeAttribute("disabled");
				} else {
					let sound = new Audio("assets/break.mp3");
					sound.play();
					pomodoros_number.innerText = pomodoros_count;
				}
			}
		} else {
			seconds_break--;

			if (seconds_break < 0) {
				seconds_break = 59;
				minutes_break--;
			}

			if (minutes_break >= 0) {
				minutes_timer.innerText = correct_time(minutes_break);
				seconds_timer.innerText = correct_time(seconds_break);
			} else {
				minutes_break = break_qnt;
				seconds_break = 0;
				on_break = false;
				on_work = true;

				text_timer.innerText = text_work;
				minutes_timer.innerText = correct_time(minutes_work);
				seconds_timer.innerText = correct_time(seconds_work);
				textarea.style.color = "red";
			}
		}
	}
}

function release_mouse() {
	clearInterval(id_interval_controls);
}

function play_timer() {
	id_interval = setInterval(timer, 1000);
}

function add_pomodoro() {
	if (!on_work && !on_break) {
		pomodoro_qnt++;

		pomodoro.innerText = pomodoro_qnt;
		pomodoros_number.innerText = pomodoros_count = pomodoro_qnt;
	}
}

function up_pomodoro() {
	id_interval_controls = setInterval(add_pomodoro, 100);
}

function subtract_pomodoro() {
	if (!on_work && !on_break) {
		pomodoro_qnt--;
		pomodoro_qnt = (pomodoro_qnt < 1) ? 1 : pomodoro_qnt;

		pomodoro.innerText = pomodoro_qnt;
		pomodoros_number.innerText = pomodoros_count = pomodoro_qnt;
	}
}

function down_pomodoro() {
	id_interval_controls = setInterval(subtract_pomodoro, 100);
}

function add_work() {
	if (!on_work && !on_break) {
		work_qnt++;
		work_qnt = (work_qnt > 59) ? 59 : work_qnt;
		minutes_work = work_qnt;

		work_time.innerText = work_qnt;
		minutes_timer.innerText = correct_time(minutes_work);
	}
}

function up_work() {
	id_interval_controls = setInterval(add_work, 100);
}

function subtract_work() {
	if (!on_work && !on_break) {
		work_qnt--;
		work_qnt = (work_qnt < 1) ? 1 : work_qnt;
		minutes_work = work_qnt;

		work_time.innerText = work_qnt;
		minutes_timer.innerText = correct_time(minutes_work);
	}
}

function down_work() {
	id_interval_controls = setInterval(subtract_work, 100);
}

function add_break() {
	if (!on_work && !on_break) {
		break_qnt++;
		break_qnt = (break_qnt > 59) ? 59 : break_qnt;
		minutes_break = break_qnt;

		break_time.innerText = break_qnt;
	}
}

function up_break() {
	id_interval_controls = setInterval(add_break, 100);
}

function subtract_break() {
	if (!on_work && !on_break) {
		break_qnt--;
		break_qnt = (break_qnt < 1) ? 1 : break_qnt;
		minutes_break = break_qnt;

		break_time.innerText = break_qnt;
	}
}

function down_break() {
	id_interval_controls = setInterval(subtract_break, 100);
}

function play() {
	if (!on_work && !on_break) {
		if (textarea.value === "") {
			textarea.value = "I will do something";
		}

		on_work = on_play = true;
		textarea.style.color = "red";
		textarea.setAttribute("disabled", "");

		play_timer();
	} else if (paused) {
		on_play = true;
		paused = false;

		if (on_work) {
			textarea.style.color = "red";
		}

		play_timer();
	}
}

function pause() {
	if (on_work || on_break) {
		on_play = false;
		paused = true;
		textarea.style.color = "darkslateblue";
	}
}

function stop() {
	clearInterval(id_interval);
	on_work = on_break = paused = false;
	minutes_work = work_qnt;
	minutes_break = break_qnt;
	seconds_work = seconds_break = 0;
	pomodoros_count = pomodoro_qnt;
	minutes_timer.innerText = correct_time(minutes_work);
	seconds_timer.innerText = "00";
	text_timer.innerText = text_work;
	textarea.style.color = "darkslateblue";
}

function reset() {
	clearInterval(id_interval);
	on_work = on_break = paused = false;
	work_qnt = minutes_work = default_work_time;
	break_qnt = minutes_break = default_break_time;
	pomodoro_qnt = pomodoros_count = default_pomodoro_qnt;
	seconds_work = seconds_work = 0;

	work_time.innerText = work_qnt;
	break_time.innerText = break_qnt;
	minutes_timer.innerText = minutes_work;
	seconds_timer.innerText = "00";
	text_timer.innerText = text_work;
	pomodoro.innerText = pomodoro_qnt;
	pomodoros_number.innerText = pomodoro_qnt;
	textarea.style.color = "whitesmoke";
	textarea.removeAttribute("disabled");
}
