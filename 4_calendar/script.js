document.addEventListener('DOMContentLoaded', function() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const notes = {}; // 날짜별 메모를 저장하는 객체

    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const noteContainer = document.getElementById('note-container');
    const noteContent = document.getElementById('note-content');

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
                const dateKey = `${currentYear}-${currentMonth}-${day}`;
                if(notes[dateKey]) {
                    // 메모가 있으면 원 안에 날짜 표시
                    daySquare.innerHTML = `<span class='note-indicator'>${day}</span>`;
                } else {
                    // 메모가 없으면 일반적으로 날짜만 표시
                    daySquare.innerText = day;
                }
                daySquare.addEventListener('click', function() {
                    noteContainer.style.display = 'block';
                    noteContent.value = notes[dateKey] || '';
                    noteContent.focus();
                    noteContent.onblur = function() {
                        if (noteContent.value.trim()) {
                            notes[dateKey] = noteContent.value;
                            daySquare.innerHTML = `<span class='note-indicator'>${day}</span>`; // 메모를 저장하고 표시 업데이트
                        } else {
                            delete notes[dateKey]; // 비어있는 메모는 삭제
                            daySquare.innerText = day; // 원래 날짜 표시로 복원
                        }
                        noteContainer.style.display = 'none';
                    };
                });
                calendarBody.appendChild(daySquare);
            } else {
                daySquare.classList.add('padding');
                calendarBody.appendChild(daySquare);
            }
        }
    }

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

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
