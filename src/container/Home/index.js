import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios'
import dataJSON from '../../data.json'
const Home = (props) => {
    const [variants, setVariants] = useState(null);
    const [exclude, setExcludeList] = useState(null);
    const [userInput,setUserInput] = useState({})
    useEffect(() => {
        async function fetchData() {
            // let data = await axios.get("https://api.jsonbin.io/b/5fdce041dcfb842f3409ee12");
            let data = JSON.parse(`{
                "variants": {
                    "variant_groups": [
                        {
                            "group_id": "1",
                            "name": "Crust",
                            "variations": [
                                {
                                    "name": "Thin",
                                    "price": 0,
                                    "default": 1,
                                    "id": "1",
                                    "inStock": 1
                                },
                                {
                                    "name": "Thick",
                                    "price": 0,
                                    "default": 0,
                                    "id": "2",
                                    "inStock": 1,
                                    "isVeg": 1
                                },
                                {
                                    "name": "Cheese burst",
                                    "price": 100,
                                    "default": 0,
                                    "id": "3",
                                    "inStock": 1,
                                    "isVeg": 1
                                }
                            ]
                        },
                        {
                            "group_id": "2",
                            "name": "Size",
                            "variations": [
                                {
                                    "name": "Small",
                                    "price": 0,
                                    "default": 1,
                                    "id": "10",
                                    "inStock": 1,
                                    "isVeg": 0
                                },
                                {
                                    "name": "Medium",
                                    "price": 100,
                                    "default": 0,
                                    "id": "11",
                                    "inStock": 1,
                                    "isVeg": 1
                                },
                                {
                                    "name": ":Large",
                                    "price": 200,
                                    "default": 0,
                                    "id": "12",
                                    "inStock": 1,
                                    "isVeg": 0
                                }
                            ]
                        },
                        {
                            "group_id": "3",
                            "name": "Sauce",
                            "variations": [
                                {
                                    "name": "Manchurian",
                                    "price": 20,
                                    "default": 0,
                                    "id": "20",
                                    "inStock": 1,
                                    "isVeg": 0
                                },
                                {
                                    "name": "Tomato",
                                    "price": 20,
                                    "default": 0,
                                    "id": "21 ",
                                    "inStock": 1,
                                    "isVeg": 1
                                },
                                {
                                    "name": "Mustard",
                                    "price": 20,
                                    "default": 0,
                                    "id": "22",
                                    "inStock": 1,
                                    "isVeg": 0
                                }
                            ]
                        }
                    ],
                    "exclude_list": [
                        [
                            {
                                "group_id": "1",
                                "variation_id": "3"
                            },
                            {
                                "group_id": "2",
                                "variation_id": "10"
                            }
                        ],
                        [
                            {
                                "group_id": "2",
                                "variation_id": "10"
                            },
                            {
                                "group_id": "3",
                                "variation_id": "22"
                            }
                        ]
                    ]
                }
            }`)
            setVariants(data.variants.variant_groups)
            setExcludeList(data.variants.exclude_list)
            let input={};
            data.variants.variant_groups.map((d)=>{
                input = {
                    ...input,
                    [d.group_id]:{
                        name:d.name,
                        variation_selected:{
                            id:null
                        }
                    }
                }
            })
            setUserInput(input)
        }
        fetchData();
    },[])
    const onFormChange= (e,price,inStock)=>{
        console.log(e.target.value,e.target.name);
        const res = variants.reduce((a,b)=> (a[b.group_id]=b,a),{});
        const sel = res[e.target.name].variations.reduce((a,b)=> (a[b.id]=b,a),{});
        console.log(res,sel);
        setUserInput({
            ...userInput,
        [e.target.name]:{
            ...userInput[e.target.name],
            variation_selected:{
                id:parseInt(e.target.value),
                price:sel[parseInt(e.target.value)].price,
                inStock:sel[parseInt(e.target.value)].inStock
            }
        }
        })
        
    }
    if (variants == null) return (
        <Layout>
            Loading
        </Layout>
    )
    const disableBool=(group_id,id)=>{
        let retVal = false;
        exclude.map((d,i)=>{
                if(d[0].group_id===group_id&&d[0].variation_id===id){
                    if(userInput[d[1].group_id]!==null){
                        if(userInput[d[1].group_id].variation_selected.id==d[1].variation_id){
                            retVal=true
                        }
                    }

                }
                if(d[1].group_id===group_id&&d[1].variation_id===id){
                    if(userInput[d[0].group_id]!==null){
                        console.log(d[1].group_id,userInput[d[0].group_id].variation_selected.id,d[0].variation_id,userInput[d[0].group_id].variation_selected.id==d[0].variation_id);
                        if(userInput[d[0].group_id].variation_selected.id==d[0].variation_id){
                            retVal=true
                        }
                    }

                }
        })
        console.log(retVal);
        return retVal;
    }
    let options = variants.map((d, i) => {
        return (
            <div>
                <label>{d.name}</label>
        <select onChange={onFormChange} key={d.group_id} name={d.group_id}  value={userInput[d.group_id].variation_selected.id} >
        <option value={null}>Select value</option>
            {d.variations.map((k,j)=>{
                return <option disabled={disableBool(d.group_id,k.id)} value={k.id}>{k.name}</option>
            })}
        </select>
        </div>
        )
    })
    console.log(userInput);
    return (
        <Layout>
            {options}
            <h6>selected Values</h6>
            {JSON.stringify(userInput)}
        </Layout>
    )
}
export default Home;