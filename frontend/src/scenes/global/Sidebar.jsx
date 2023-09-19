import {useEffect, useState} from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {tokens} from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HotelIcon from '@mui/icons-material/Hotel';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WcIcon from '@mui/icons-material/Wc';
import WeekendIcon from '@mui/icons-material/Weekend';
import {useDispatch, useSelector} from "react-redux";
import {getGoals, reset} from "../../features/goals/goalSlice";
import Spinner from "../../components/Spinner";
import Logout from "../../components/Logout";

function getGoalIcon(type) {
    switch (type) {
        case 'cuisine':
            return <RestaurantIcon />;
        case 'chambre':
            return <HotelIcon />;
        case 'salon':
            return <WeekendIcon />;
        case 'WC':
            return <WcIcon />;
        // Ajoutez d'autres cas pour les types de but supplémentaires
        default:
            return null; // Retournez null si le type de but n'a pas d'icône correspondante
    }
}

const Item = ({title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
    )
    useEffect(() => {
       if (user){
            if (isError) {
                console.log(message)
            }

            dispatch(getGoals())

            return () => {
                dispatch(reset())
            }
       }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <header>
        {user ? (
                <Box
                    sx={{
                        "& .pro-sidebar-inner": {
                            background: `${colors.primary[400]} !important`,
                        },
                        "& .pro-icon-wrapper": {
                            backgroundColor: "transparent !important",
                        },
                        "& .pro-inner-item": {
                            padding: "5px 35px 5px 20px !important",
                        },
                        "& .pro-inner-item:hover": {
                            color: "#868dfb !important",
                        },
                        "& .pro-menu-item.active": {
                            color: "#6870fa !important",
                        },
                    }}
                >
                    <ProSidebar collapsed={isCollapsed}>
                        <Menu iconShape="square">
                            {/* LOGO AND MENU ICON */}
                            <MenuItem
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                                style={{
                                    margin: "10px 0 20px 0",
                                    color: colors.grey[100],
                                }}
                            >
                                {!isCollapsed && (
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        ml="15px"
                                    >
                                        <Typography variant="h3" color={colors.grey[100]}>
                                            MENU
                                        </Typography>
                                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                            <MenuOutlinedIcon/>
                                        </IconButton>
                                    </Box>
                                )}
                            </MenuItem>


                            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                                <Item
                                    title="Dashboard"
                                    to="/"
                                    icon={<HomeOutlinedIcon/>}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Typography
                                    variant="h6"
                                    color={colors.grey[300]}
                                    sx={{m: "15px 0 5px 20px"}}
                                >
                                    Rooms
                                </Typography>

                                {goals.length > 0 ? (
                                    <div>
                                        {goals.map((goal) => (
                                            <Item
                                                title={goal.name}
                                                to={`/objects/${goal._id}`}
                                                icon={getGoalIcon(goal.type)} // Utilisez la fonction getGoalIcon ici
                                                selected={selected}
                                                setSelected={setSelected}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </Box>
                            {!isCollapsed && (
                                <>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        ml="15px"
                                    >
                                    <Logout isCollapsed={isCollapsed}/>
                                    </Box>
                                <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                                ><Logout isCollapsed={isCollapsed}/>

                                </Box>
                                </>
                            )}
                        </Menu>
                    </ProSidebar>
                </Box>
            ) : (
                <>
                </>
            )}
        </header>
    );
};

export default Sidebar;
