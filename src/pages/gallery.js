import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Card from '../component/card';

export default class Gallery extends React.Component{
    constructor(){
        super()
        this.state = {
            buku : [
                {
                    isbn: "00001",
                    judul: "The Godfather",
                    penulis: "Francis Ford Coppola",
                    penerbit: "Paramount Pictures",
                    harga: 300000,
                    cover: "https://drive.google.com/uc?id=1z_8m_pTLUdr191N5NMM6WgxPd5YrFlLY"
                },{
                    isbn: "00002",
                    judul: "DUNE: Part One",
                    penulis: "Denis Villeneuve",
                    penerbit: "Legendary Pictures",
                    harga: 245000,
                    cover: "https://drive.google.com/uc?id=1q-jCFGi2Ri-KhbNGbhabYYOmI5k2-8RA",
                }
            ],

            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            action: "",
            selectedItem: null,
            isModalOpen: false,
            search: "",
            filterBuku: []
        }
        this.state.filterBuku = this.state.buku
    }
    handleSave= (e) => {
        e.preventDefault()
        let tempBuku = this.state.buku

        if (this.state.action === "insert") {
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                harga: this.state.harga,
                cover: this.state.cover
            })
        }
        else if (this.state.action === "update") {
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].harga = this.state.harga
            tempBuku[index].cover = this.state.cover
        }

        this.setState({
            buku: tempBuku,
            isModalOpen: false
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    add = () => {
        this.setState({
            isModalOpen: true,
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            action: "insert"
        })
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    edit = (item) => {
        this.setState({
            isModalOpen: true,
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            harga: item.harga,
            cover: item.cover,
            action: "update",
            selectedItem: item
        })
    }
    drop = (item) => {
        console.log('drop')
        if (window.confirm("Apakah anda yakin ingin menghapus data ini")) {
            let tempBuku = this.state.buku
            let index = tempBuku.indexOf(item)

            tempBuku.splice(index, 1)
            this.setState({
                buku: tempBuku
            })
        }
    }
    addtoCart = (selectedItem) =>{
        // console.log("cart")
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)
        console.log(existItem)
        if (existItem) {
            window.alert("Anda Telah Menambahkan Produk Ini")
        }else{
            let jumlah = window.prompt("Masukkan Jumlah","")
            if (jumlah !== null && jumlah !=="") {
                selectedItem.jumlahBeli = jumlah

                tempCart.push(selectedItem)

                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }
    search = (e) => {
        if (e.keyCode === 13) {
            let search = this.state.search.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(search) ||
                item.penulis.toLowerCase().includes(search) ||
                item.penerbit.toLowerCase().includes(search) ||
                item.harga.toString().includes(search)
            })

            // console.log(result)
            this.setState({
                filterBuku: result
            })

        }
    }
    setUser = () =>{
        if (sessionStorage.getItem("user") === null){
            let input = window.prompt("Masukkan Nama Anda","")
            if (input === null || null === ""){
                this.setUser()
            }else{
                sessionStorage.setItem("user", input)
                this.setState({
                    user: input
                })
            }
        }else{
            let userName = sessionStorage.getItem("user")
            this.setState({
                user: userName
            })
        }
    }
    componentDidMount = () =>{
        this.setUser()
    }
    render(){
        return(
            <div className='container'>
                    <h1 className="text-center">Gallery</h1>
                    <h5 className='text-grey'>
                        Nama Pengguna : {this.state.user}
                    </h5>
                    <input type="text" name="search" className="form-control" placeholder="Search"
                    onChange={this.handleChange} onKeyUp={e => this.search(e)} />
                    <br />
                    <button className='btn btn-success' onClick={() => this.add()}>
                        Tambah
                    </button>
                    <div className='row'>
                    {this.state.filterBuku.map((item,index) => (
                        <Card cover={item.cover}
                            judul={item.judul}
                            penulis={item.penulis}
                            penerbit={item.penerbit}
                            harga={item.harga}
                            onEdit={() => this.edit(item)}
                            onDrop={() => this.drop(item)}
                            onCart={() => this.addtoCart(item)}
                        />
                    ))}
                </div>

                {/* ini Modal */}
                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Form Buku</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="isbn">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" name="isbn" placeholder="Masukkan ISBN Buku" 
                            value={this.state.isbn} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="judul">
                            <Form.Label>Judul Buku</Form.Label>
                            <Form.Control type="text" name="judul" placeholder="Masukkan Judul Buku" 
                            value={this.state.judul} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="penulis">
                            <Form.Label>Penulis Buku</Form.Label>
                            <Form.Control type="text" name="penulis" placeholder="Masukkan Penulis Buku" 
                            value={this.state.penulis} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="penerbit">
                            <Form.Label>Penerbit Buku</Form.Label>
                            <Form.Control type="text" name="penerbit" placeholder="Masukkan Penerbit Buku" 
                            value={this.state.penerbit} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="harga">
                            <Form.Label>Harga Buku</Form.Label>
                            <Form.Control type="number" name="harga" placeholder="Masukkan Harga Buku" 
                            value={this.state.harga} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cover">
                            <Form.Label>Cover Buku</Form.Label>
                            <Form.Control type="url" name="cover" placeholder="Masukkan Cover Buku" 
                            value={this.state.cover} onChange={this.handleChange} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <button variant="secondary" onClick={this.handleClose}>
                        Close
                    </button>
                    <button variant="primary" type="submit">
                        Save
                    </button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}