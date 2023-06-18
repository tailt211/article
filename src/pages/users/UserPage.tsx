import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteUserThunk,
  fetchAllUserThunk,
} from "../../store/users/users.thunk";
import { removeUser } from "../../store/users/users.slice";
import Loader from "../../components/loader/Loader";
import NotFound from "../../components/notFound/NotFound";

const UsersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userList, loading } = useSelector((state: RootState) => state.user);
  const { myProfile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchAllUserThunk());
  }, [dispatch]);

  const handleRemoveUser = (email: string, id: number) => {
    dispatch(deleteUserThunk({ email: email }));
    dispatch(removeUser(id));
  };

  return (
    <Container maxWidth="xl" sx={{ minWidth: "1000px", marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>avatar</TableCell>
            <TableCell>username</TableCell>
            <TableCell>email</TableCell>
            <TableCell>bio</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <Loader />}
          {!loading && userList.length === 0 && <NotFound />}
          {!loading &&
            userList.length > 0 &&
            userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Avatar src={user.image || ""} />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.bio}</TableCell>
                <TableCell>
                  {user.id !== myProfile?.id && (
                    <Button
                      color="error"
                      onClick={() => handleRemoveUser(user.email, user.id)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UsersPage;
