import React from "react";

export default  class Cart extends React.Component{
    constructor(){
        super()
        this.state ={
            cart: [],
            user: "",
            total:0
        }
    }
    getUser = () =>{
        let userName = sessionStorage.getItem("user")
        this.setState({
            user: userName
        })
    }
    getCart = () =>{
        let tempCart = []
        let totalHarga =0
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahBeli)
        })
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }
    componentDidMount = () =>{
        this.getUser()
        this.getCart()
    }
    // drop = (item) => {
    //     console.log('drop')
    //     if (window.confirm("Apakah anda yakin ingin menghapus data ini")) {
    //         let tempCart = this.state.cart
    //         let index = tempCart.indexOf(item)
    //         window.localStorage.removeItem('cart');
    //         window.location.reload(false);

    //         tempCart.splice(index, 1)
    //         this.setState({
    //             cart: tempCart
                
    //         })
    //     }
    // }
    // drop = (item) => {
    //     if (window.confirm("Apakah anda yakin ingin menghapus data ini")) {
    //         window.localStorage.removeItem('cart');
    //         window.location.reload(false);
    //     }
    // }
    drop(item) {
        var array = [this.state.cart]; // make a separate copy of the array
        var index = array.indexOf(item.target.value)
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({cart: array});
        }
      }
    render(){
        return(
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        Keranjang Belanja
                    </div>
                    <div className="card-body">
                        <h5 className="text-grey">
                            Nama Pengguna: {this.state.user}
                        </h5>
                        <table className="table table-bordered">
                            <thead>
                                <th>Judul</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total Harga</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {this.state.cart.map((item, index) =>{
                                    return(
                                        <tr key={index}>
                                            <td>{item.judul}</td>
                                            <td>{item.harga}</td>
                                            <td>{item.jumlahBeli}</td>
                                            <td>{item.harga * item.jumlahBeli}</td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => this.drop(item)}>
                                                Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <h5 className="text-info">
                            Total Harga: {this.state.total}
                        </h5>
                        <button className='btn btn-danger' >Hapus</button>
                    </div>
                </div>
            </div>
        )
    }
}