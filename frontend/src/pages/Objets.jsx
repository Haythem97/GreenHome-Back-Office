import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getObjects, reset } from '../features/objects/objectSlice'
import { useParams } from 'react-router-dom';
import ObjectForm from "../components/Object/ObjectForm";
import ObjectItem from "../components/Object/ObjectItem";
import {Box} from "@mui/material";

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { objects, isLoading, isError, message } = useSelector(
        (state) => state.objects
    )
    const { goalId } = useParams(); // Obtenez l'ID depuis les paramètres d'URL
    const numberOfLampes = (objects.filter(object => object.type === 'lampe')).length;
    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }

        dispatch(getObjects(goalId))

        return () => {
            dispatch(reset())
        }
    }, [goalId, user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>SALON</h1>
            </section>

            <ObjectForm numberOfLampes={numberOfLampes} />

            <section className='content'>

                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >

                    {/* ROW 3 */}
                    {objects.length > 0 ? (
                        <div className='objects'>
                            {objects.map((object) => (
                                    <ObjectItem object={object}/>
                            ))}
                        </div>
                    ) : (
                        <> </>
                    )}
                </Box>

            </section>
        </>
    )
}

export default Dashboard
