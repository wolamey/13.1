/*
navigator.geolocation.getCurrentPosition(
    function(position) {
        let a = position.coords.latitude;
        let b =position.coords.longitude;

	    console.log('Последний раз вас засекали здесь: ' +
		    position.coords.latitude + ", " + position.coords.longitude);
  //  load(a,b);

	}
);
*/

 function createElement(element, value) {
    let el = document.createElement(element);
    el.innerHTML = value;
    return el;
}

const http = new XMLHttpRequest;
http.addEventListener('load', () => {
    const a = JSON.parse(http.responseText);

    const city = a.city.name;
    let c = createElement('p', city);
    let date = createElement('p', new Date().toLocaleDateString());
    let now = createElement('p', new Date().toLocaleTimeString().slice(0, -3));

    let cd = createElement('div', '');
    cd.append(c, date, now);
    cd.style.marginTop = '20px';
    cd.style.marginLeft = '20px';

    let temp = Math.round(a.list[0].main.temp) + "°C";
    let icon = createElement('img', '');
    icon.src = 'http://openweathermap.org/img/wn/' + a.list[0].weather[0].icon + '@2x.png';
    let weth = createElement('p', a.list[0].weather[0].main);

    let main = createElement('div', '');
    main.append(icon, weth, temp);
    main.style.display = 'flex';
    main.style.flexDirection = 'column';
    main.style.width = '100px';
    main.style.margin = 'auto';
    main.style.alignItems = 'center'

    let speed = createElement('div', '');
    speed.style.width = '80%';
    speed.style.margin = 'auto';
    speed.style.display = 'flex';
    speed.style.justifyContent = 'space-between';
    speed.style.marginTop = '30px';
    let wind = createElement('p', a.list[0].wind.speed);
    let st = createElement('p', 'Speed');
    speed.append(st, wind);

    let wthr = document.getElementById('wthr');
    wthr.append(cd, main, speed);

    let forecast = document.getElementById('forecast');
    for (let i = 8; i < a.list.length; i += 8) {
        let dttxt = createElement('p', a.list[i].dt_txt);
        dttxt.style.width = '80px';

        let icon = createElement('img', '');
        icon.src = 'http://openweathermap.org/img/wn/' + a.list[i].weather[0].icon + '@2x.png';
        icon.style.width = '70px';
    
        let tmp = createElement('p', Math.round(a.list[i].main.temp) + "°C");

        let dt = createElement('div', '');
        dt.append(dttxt, icon, tmp);
        dt.classList.add('f');
        forecast.append(dt);
    }

})

http.open('GET', 'https://api.openweathermaporg/geo/1.0/reverse?lat=' + a + '&lon=' + b + '&appid=a94d0a5ac08570add4b47b8da933f247&units=metric');

http.send();   

