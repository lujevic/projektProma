class Poslovnica {

    constructor(id, naziv, email, lokacija, artikli = [], zarada = 0) {
      this.id = id
      this.naziv = naziv;
      this.email = email;
      this.lokacija = lokacija;
      this.artikli =  artikli;
      this.zarada = zarada;

    }
}

export default Poslovnica
