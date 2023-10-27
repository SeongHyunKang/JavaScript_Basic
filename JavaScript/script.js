function myExternalAlert() {
    alert('world!!!!!!!!!!!');
}

function validateAndPrint() {
    const numberInput = document.getElementById('numberInput');
    const inputValue = numberInput.value;
    const number = parseInt(inputValue);

    if (isNaN(number)) {
        alert('숫자를 입력해 주세요');
        return;
    }

    if (number < 1 || number > 100) {
        alert('1이상 100 이하를 넣어주세요');
        return;
    }

    for (let i = 1; i <= 100; i++) {
        console.log(i);
    }

    alert('완료되었습니다.');
}