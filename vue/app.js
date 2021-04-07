const car = (name, model, owner, year, phone, image) => ({ name, model, owner, year, phone, image });
const log = (text, type, date = new Date()) => ({text, type, date});

const cars = [
    car('Buggati', 'Verona', 'Max', 2016, '+375 29 164 14 20', 'images/bugatti-verona.jpg'),
    car('Buggati', 'Veyron', 'Katy', 2018, '+375 44 517 73 64', 'images/bugatti-veyron.jpg'),
    car('Lamborgini', 'Aventador', 'Anton', 2019, '+375 29 602 13 15', 'images/lambo-aventador.jpg'),
]

new Vue({
    el: '#app',
    data: {
        cars, 
        car: cars[0],
        logs: [],
        selectedCarIndex: 0,
        phoneVisibility: false,
        search: '',
        modalVisibility: false
    },
    methods: {
        selectCar (index) {
            this.car = cars[index];// как работает с областями видимости - здесь this ссылается на инстанс и нет доступа к изолир перем кар которая в дата находится???
            this.selectedCarIndex = index;
        },
        newOrder () {
            this.modalVisibility = false;
            this.logs.push(
                log(`Success order: ${this.car.name} - ${this.car.model}`, 'ok')
            );
        },
        cancelOrder () {
            this.modalVisibility = false;
            this.logs.push(
                log(`Cancelled order: ${this.car.name} - ${this.car.model}`, 'canceled')
            );
        }
    },
    computed: {
        phoneBtnText () {
            return this.phoneVisibility ? 'Hide phone' : 'Show phone'
        },
        filteredCars () {
            return this.cars.filter((car) => {
                return car.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 
                    || car.model.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            })
        }
    },
    filters: {
        date(value) {
            return value.toLocaleString();
        }
    }
})
