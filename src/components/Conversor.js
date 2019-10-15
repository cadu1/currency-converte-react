import React, {Component} from 'react';
import './Conversor.css';

export default class Conversor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            moedaA_valor: '',
            moedaB_valor: 0
        }

        this.converter = this.converter.bind(this);
    }

    converter() {
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;
        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=b2c0635ce34048ae1a13`;

        fetch(url)
        .then(result => {
            return result.json()
        })
        .then(json => {
            let cotacao = json[de_para];
            let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2);
            this.setState({moedaB_valor});
        })
    }

    render() {
        return (
            <div className="Conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input type="text" onChange={(event) => {this.setState({moedaA_valor:event.target.value})}} />
                <input type="button" value="Converter" onClick={this.converter} />
                <h2>{this.state.moedaB_valor}</h2>
            </div>
        );
    }
}