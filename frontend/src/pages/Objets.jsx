import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getObjects, reset } from '../features/objects/objectSlice'
import { useParams } from 'react-router-dom';
import ObjectForm from "../components/Object/ObjectForm";

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { objects, isLoading, isError, message } = useSelector(
        (state) => state.objects
    )
    const { goalId } = useParams(); // Obtenez l'ID depuis les paramètres d'URL
    const numberOfLampes = (objects.filter(object => object.type === 'lampe')).length;
    console.log(numberOfLampes)
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
                <h1>Welcome {user && user.name}</h1>
            </section>

            <ObjectForm numberOfLampes={numberOfLampes} />

            <section className='content'>

                    <div className='goals'>
                        <ul>
                            {objects.map((object) => (
                                <li key={object._id}>
                                    <h1>{object.text}</h1>
                                </li>
                            ))}
                        </ul>
                    </div>

            </section>
        </>
    )
}

export default Dashboard
