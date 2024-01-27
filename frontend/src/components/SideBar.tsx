import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Sidebar: React.FC = () => {
    return (
        <Drawer variant="permanent" open>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Agendamentos" />
                </ListItem>
                <ListItem button component={Link} to="/clientes">
                    <ListItemText primary="Clientes" />
                </ListItem>
                <ListItem button component={Link} to="/pets">
                    <ListItemText primary="Pets" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
