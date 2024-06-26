import React,{useState,useRef,useEffect} from 'react'
import {AiOutlineMail} from "react-icons/ai"
import {MdLocationPin} from "react-icons/md"
import { createProfile } from '../api/createProfile'
import { useNavigate } from "react-router-dom";
import {BsFlag} from "react-icons/bs"
import ClipLoader from "react-spinners/ClipLoader";
import { useOutletContext } from 'react-router-dom'
// import { Alert, Avatar, Button, Divider, InputBase } from "@mui/material";
import ReactSelect from "react-select";
import axios from "axios"
import { formatPhoneNumber } from '../Utils/formatPhoneNumber';
import { countryCode } from '../Utils/countrydialingcodes';
import { IoCloseOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { FaRegCalendar } from "react-icons/fa6";

export default function OrgForm({user}) {
    
    let navigate = useNavigate();


    console.log(user,"user")

    const [orgName,setName]=useState("")
    const [orgEmail,setEmail]=useState("")
    const [phoneNum,setNum]=useState("")
    const [orgLocation,setLocation]=useState("")
    const [tags,setTags]=useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading,setLoader]=useState(false)
    
    const [tag,setTag]=useState("")


    const [file,setFile]=useState()
    const [url,setUrl]=useState("")
    const [country, setSelectedCountry] = useState({label:"United States,USA"});
    const [city, setSelectedCity] = useState();
    const [countries, setCountries] = useState([]);

    const options = [
      { value: "tech", label: "Tech" },
      { value: "media", label: "Media" },
      { value: "business", label: "Businnes" },
      { value: "art", label: "Art" },
    ];
  
    const [selectedOption, setSelectedOption] = useState("");
  
    const handleTagChange = (selectedOption) => {
      console.log(selectedOption);
      setSelectedOption(selectedOption.value);
    };


    useEffect(() => {
        getCountries();
      }, []);
    
      async function getCountries() {
        await axios
          .get("https://countriesnow.space/api/v0.1/countries/")
          .then((response) => {
            setCountries(response?.data?.data);
          });
      }
     
      const style = {
        control: (base) => ({
          ...base,
          border: "0px solid rgba(242,242,242,0.6)",
          width: "100%",
          boxShadow: "none",
          backgroundColor: "rgba(242,242,242,0.6)",
          fontSize: "14px",
          "@media (min-width:600px)": {
            width: "100%",
          },
          "@media (min-width:1200px)": {
            width: "100%",
          },
        }),
      };

    const hiddenFileInput = useRef()

    const handleClick = event => {
         hiddenFileInput.current.click()
     }

      const handleChange = async(e)=> {
          const dir = e.target.files[0]
          console.log(dir,"dir")
          if (dir) {
            setUrl({
                src: URL.createObjectURL(dir)
              })
          }
         setFile(dir)
    
      }


      const create=async()=>{
        setLoader(true)
        setErrorMsg(null)

        if (orgName?.length < 3) {
          setErrorMsg( 'Organization name is required ');
          setLoader(false);
          return;
        }
    
        if (orgEmail?.length < 3) {
          setErrorMsg( 'Email is required' );
          setLoader(false);
          return;
        }
    
        // if (phoneNum?.length < 3) {
        //   setErrorMsg(' Contact Phone number is required');
        //   setLoader(false);
        //   return;
        // }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(orgEmail)){
            setErrorMsg( "E-mail is invalid" );
            setLoader(false);
        }
    
        // if (country?.length< 3) {
        //   setErrorMsg(' Location is invalid ');
        //   setLoader(false);
        //   return;
        // }

        if (url?.length ===0) {
            setErrorMsg( 'Image is required');
            setLoader(false);
            return;
          }
        try{
            const payload={
                creator:user?.id,
                name:orgName,
                email:orgEmail,
                location:country?.label,
                tags:tags

            }
            const result =await createProfile.createOrgProfile(payload,file,user)
            setLoader(false)
            console.log(result,"result")
            setLoader(false)
            // result?.id?.length>0&& navigate(`/home/${result?.id}`)
            result&& navigate(`/-profile`)
          }catch(e){
            console.log(e)
            setLoader(false)
            setErrorMsg(e.message)
          }

  
           
        }

        const createTag=()=>{
          setTags(prevArray => [...prevArray, tag]);
          setTag("")

        }

        const remove=(indexToRemove)=>{
 
          const newArray = [...tags.slice(0, indexToRemove), ...tags.slice(indexToRemove + 1)];

          // Update the array state
          setTags(newArray);
        }


  return (
    <div className='w-full flex flex-col  space-y-6  h-full' style={{background: "rgba(242, 242, 242, 0.6)"}}>
            <div className='w-full flex bg-white rounded-lg  border flex-col  space-y-8 py-4 ' style={{borderColor:" linear-gradient(0deg,rgba(130, 122, 247, 0.5), rgba(130, 122, 247, 0.5)),linear-gradient(0deg, #FFFFFF, #FFFFFF)"}}>
                <div className='flex flex-col items-center w-full space-y-10'>
                    <h5 className='text-xl font-semibold'>Tell us more about your business</h5>
                  

                     {url?.length ==0&&
                        <div className='rounded-full h-44 w-44 flex flex-col justify-center items-center -space-y-6' style={{background: "rgba(242, 242, 242, 0.6)"}}
                            onClick={handleClick}
                            >
                            <h5 className='text-sm font-light'>Upload Profile Photo*</h5> 
                            <h5 className='text-xs font-light'>(Acceptable: jpeg, png)</h5>

                            <input
                                type="file"
                                className='hidden'
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                />
                            </div>
                            }
                            { url?.src?.length > 0&&
                                <div className='rounded-full h-44 w-44'
                                    onClick={handleClick}
                                    >
                                    <img
                                    src={url?.src}
                                    className='w-full h-full rounded-full'
                                    />
                                        <input
                                            type="file"
                                            className='hidden'
                                            ref={hiddenFileInput}
                                            onChange={handleChange}
                                            />
                                    
                                </div>
                            
                            }

                </div>


                 <div className='flex flex-col w-9/11 px-10'>  
                    <div className='px-6 py-8'>
                            {errorMsg && (
                                <></>
                            // <FadeIn><Alert severity="error">{errorMsg}</Alert></FadeIn>
                            // <Alert severity="error">{errorMsg}</Alert>
                            )}

                        </div>

                        <label className='text-sm text-slate-600 font-semibold'>Organization Name*</label>
                            <input 
                                placeholder='Organization Name'
                                className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                name="orgName"
                                value={orgName}
                                onChange={(e)=>setName(e.target.value)}
                        
                            />

                            <h5 className='font-light text-slate-500 text-sm '>This email will NOT be shared on the organization profile. This email will be used for all Guzo correspondence.</h5>

                  </div>



                 <div className='flex flex-col w-9/11 px-10'>  
                     <label className='text-sm text-slate-600 font-semibold'>Organization Contact Email*</label>
                     <div className='flex items-center space-x-4 px-4 rounded-md'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            >
                            <AiOutlineMail
                                className="text-slate-500 font-semibold text-lg "
                            />
                            <input 
                                placeholder='Email'
                                className=' py-2  w-full rounded-md text-sm outline-none'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                name="orgEmail"
                                value={orgEmail}
                                onChange={(e)=>setEmail(e.target.value)}
                        
                            />
                         </div>
                        <h5 className='font-light text-slate-500 text-sm '>This email will NOT be shared on the organization profile. This email will be used for all Guzo correspondence.</h5>

                   </div>

                  <div className='flex flex-col w-9/11 px-10'>  

                      <label className='text-sm text-slate-600 font-semibold'>Contact Phone Number*</label>
                            <div className='flex items-center space-x-3 px-4 rounded-md'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            >
                         
                            <input 
                                placeholder='(201) 555-0123'
                                className=' py-2  w-full rounded-md text-sm outline-none'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                name="phoneNum"
                                value={phoneNum}
                                onChange={(e)=>setNum(formatPhoneNumber(e.target.value))}
                        
                            />
                         </div>

                       <h5 className='font-light text-slate-500 text-sm '>This phone number will NOT be shared on the organization profile. This phone number is for Guzo organization verification.</h5>

                  </div>


                  <div className='flex flex-col w-9/11 space-y-2 px-10'>
                        <label className='text-sm text-slate-700'>Organization Location*</label>
                        <div className='flex items-center space-x-4 px-4 rounded-md'
                        style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                        >
                            <MdLocationPin 
                            className="text-slate-500 font-semibold text-lg "
                            />
                            
                           <div className="border-[1px] border-[rgba(242,242,242,0.6)] rounded-[8px] w-full">
                                        <ReactSelect
                                            styles={style}
                                            placeholder='Country'
                                            options={
                                            countries &&
                                            countries?.map((item, index) => ({
                                                label: item?.country + "," + item?.iso3,
                                                value: item?.country,
                                                cities: item?.cities,
                                                iso:item?.iso3
                                            }))
                                            }
                                            value={country}
                                            menuPlacement="auto"
                                            menuPosition="fixed"
                                            noOptionsMessage={(opt) => {
                                            if (opt.inputValue === "") {
                                                return "Select your country";
                                            } else {
                                                return "no search results for " + opt?.inputValue;
                                            }
                                            }}
                                            components={{
                                            IndicatorSeparator: () => null,
                                            }}
                                            onChange={(opt) => {
                                            setSelectedCountry(opt);
                                            setSelectedCity({label:opt?.cities[0], value :opt?.cities[0]})
                                            }}
                                        />
                                    </div>

                        </div>

                        <h5 className='font-light text-slate-500 text-sm '>Where is your organization headquartered?</h5>
                                    

                   </div>

                   <div className='flex flex-col w-9/11 px-10'>  
                     <label className='text-sm text-slate-600 font-semibold'>Industry</label>
                     <div className='flex items-center space-x-4 px-4 rounded-md'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            >
                            <IoBag
                                className="text-slate-500 font-semibold text-lg "
                            />
                            <input 
                                placeholder='Industry'
                                className=' py-2  w-full rounded-md text-sm outline-none'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                name="orgEmail"
                                value={orgEmail}
                                onChange={(e)=>setEmail(e.target.value)}
                        
                            />
                         </div>
                   </div>


                   <div className='flex flex-col w-9/11 px-10'>  
                     <label className='text-sm text-slate-600 font-semibold'>Calendar Scheduling Link</label>
                     <div className='flex items-center space-x-4 px-4 rounded-md'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            >
                            <FaRegCalendar
                                className="text-slate-500 font-semibold text-lg "
                            />
                            <input 
                                placeholder='Website Link'
                                className=' py-2  w-full rounded-md text-sm outline-none'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                name="orgEmail"
                                value={orgEmail}
                                onChange={(e)=>setEmail(e.target.value)}
                        
                            />
                         </div>
                   </div>

                   <div className='flex flex-col w-9/11 px-10'>  
                     <label className='text-sm text-slate-600 font-semibold'>Website</label>
                     <div className='flex items-center space-x-4 px-4 rounded-md'
                            style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                            >
                            <FaRegCalendar
                                className="text-slate-500 font-semibold text-lg "
                            />
                            <input 
                                placeholder='Website Link'
                                className=' py-2  w-full rounded-md text-sm outline-none'
                                style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                name="orgEmail"
                                value={orgEmail}
                                onChange={(e)=>setEmail(e.target.value)}
                        
                            />
                         </div>
                   </div>



                    <div className='flex flex-col w-9/11 px-10'>  

                        <label className='text-sm text-slate-600 font-semibold'>Descriptive Tags</label>
                           <div className='flex items-center space-x-4'>
                              <input 
                                    placeholder='Add tags separated by a comma...'
                                    className=' py-2 px-4 w-full rounded-md text-sm outline-none'
                                    style={{background: "linear-gradient(0deg, #F2F2F2, #F2F2F2),linear-gradient(0deg, rgba(242, 242, 242, 0.6), rgba(242, 242, 242, 0.6))"}}
                                    value={tag}
                                    onChange={(e)=>setTag(e.target.value)}
                                />

                                <IoIosAddCircle
                                    className='text-5xl  text-blue-500 hover:text-blue-300' 
                                    onClick={()=>createTag()}
                                 />

                           </div>


                            

                            <h5 className='font-light text-slate-500 text-sm '>Tags help Guzo curate relevant connections and opportunities.</h5>

                     </div>

                     <div className='flex flex-wrap  justify-start items-center space-x-3 py-4 px-10'>
                          
                             {tags?.map((tword,index)=>{
                                return(
                                   <button className="rounded-lg py-0.5  px-2 border text-sm text-slate-600 font-light space-x-6 flex items-center justify-between ">
                                     <span> {tword}</span>
                                     <IoCloseOutline 
                                       className='text-lg'
                                       onClick={()=>remove(index)}
                                     />

                                    </button>
                                )
                             })

                             }

                        </div>
            </div>
            
            <div className='flex  items-center w-full justify-between'>
                   <h5></h5>
                      {isLoading?
                             
                             <ClipLoader 
                                 color={"rgba(62, 51, 221, 1)"}
                                 loading={isLoading}
                             />
                                          :
                            <button className='px-6 py-2 text-blue-600 rounded-full' 
                            style={{background: "rgba(237, 237, 237, 1)"}}
                            onClick={create}
                            > Continue</button>
                          }
                            
            </div>


    </div>
  )
}
