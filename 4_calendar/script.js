document.addEventListener('DOMContentLoaded', function() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const notes = {}; // 날짜별 메모를 저장하는 객체
    let selectedDateKey = null;

    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const noteContainer = document.getElementById('note-container');
    const noteContent = document.getElementById('note-content');
    const registerNoteButton = document.getElementById('register-note');
    const editNoteButton = document.getElementById('edit-note');
    const deleteNoteButton = document.getElementById('delete-note');
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function updateNoteVisibility() {
        if (selectedDateKey && notes[selectedDateKey]) {
            noteContent.readOnly = true;
            noteContent.value = notes[selectedDateKey];
            registerNoteButton.style.display = 'none';
            editNoteButton.style.display = 'inline';
            deleteNoteButton.style.display = 'inline';
        } else {
            noteContent.readOnly = false;
            noteContent.value = '';
            registerNoteButton.style.display = 'inline';
            editNoteButton.style.display = 'none';
            deleteNoteButton.style.display = 'none';
        }
        noteContainer.style.display = 'block';
    }

    function selectDate(dateKey) {
        selectedDateKey = dateKey;
        updateNoteVisibility();
    }

    function renderCalendar() {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        const paddingDays = weekDays.indexOf(dateString.split(', ')[0]);

        const monthYear = document.getElementById('month-year');
        monthYear.innerText = `${firstDayOfMonth.toLocaleDateString('en-us', { month: 'long' })} ${currentYear}`;

        const calendarBody = document.getElementById('calendar-body');
        calendarBody.innerHTML = '';

        for(let i = 1; i <= paddingDays + daysInMonth; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');
            if(i > paddingDays) {
                const day = i - paddingDays;
                daySquare.innerText = day;
                const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
                daySquare.addEventListener('click', function() {
                    selectDate(dateKey);
                });

                if(notes[dateKey]) {
                    daySquare.innerHTML = `<span class='note-indicator'>${day}</span>`;
                }
            } else {
                daySquare.classList.add('padding');
            }
            calendarBody.appendChild(daySquare);
        }
    }

    registerNoteButton.addEventListener('click', () => {
        if (noteContent.value.trim()) {
            notes[selectedDateKey] = noteContent.value.trim();
            renderCalendar();
            noteContainer.style.display = 'none';
        }
    });

    editNoteButton.addEventListener('click', () => {
        noteContent.readOnly = false;
        registerNoteButton.style.display = 'inline';
        editNoteButton.style.display = 'none';
        deleteNoteButton.style.display = 'none';
    });

    deleteNoteButton.addEventListener('click', () => {
        if (confirm('메모를 삭제하시겠습니까?')) {
            delete notes[selectedDateKey];
            renderCalendar();
            noteContainer.style.display = 'none';
        }
    });

    prevMonthButton.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        renderCalendar();
    });

    renderCalendar(); // 초기 캘린더 렌더링
});
