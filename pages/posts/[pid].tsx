/* eslint-disable no-bitwise */
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";

import Title from "components/title";
import {
  Button,
  // Button,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { getPostsById, updateAdvice } from "services/posts";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

function Post() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pid, realm } = router.query;

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  // ** States
  const [AdviceInfo, setAdviceInfo] = useState({});

  const handleChange = (event) => {
    setAdviceInfo({ ...AdviceInfo, [event.target.name]: event.target.value });
    console.log(AdviceInfo, "AdviceInfo");
  };
  useEffect(() => {
    getPostsById(pid as string)
      .then((res) => {
        setAdviceInfo(res.result.data);
      })
      .catch((error) => {
        setData(null);
      });
  }, [pid]);
  // const { data, refetch } = useQuery(
  //   ["postById"],
  //   () => getPostsById(pid as string),
  //   {
  //     keepPreviousData: true,
  //   }
  // );
  // const { data: userData } = useQuery(
  //   ["user", data?.creator],
  //   () => getUserById(data?.creator as string),
  //   {
  //     keepPreviousData: true,
  //     // eslint-disable-next-line no-underscore-dangle
  //     enabled: !!data?._id,
  //   }
  // );

  // const { mutate } = useMutation(updatePost, {
  //   onSuccess: () => {
  //     toast.success("Successfully updated !");
  //     refetch();
  //   },
  //   onError: (error: any) => {
  //     toast.error(`cannot update  !\n${error.message}`);
  //   },
  // });

  // const {
  //   tweetText,
  //   image,
  //   tags,
  //   type,
  //   visibility,
  //   retweetAuthor,
  //   creator,
  //   comments,
  //   medias,
  //   hashtagsPosts,
  //   likes,
  //   bookmarks,
  //   retweets,
  //   liked,
  //   saved,
  //   retweeted,
  //   timesSaved,
  //   tweetScore,
  //   createdAt,
  //   updatedAt,
  //   likesCount,
  //   retweetsCount,
  //   bookmarksCount,
  //   commentsCount,
  //   id,
  // } = data;

  // const user = {
  //   id: userData?.id || "1",
  //   img: `${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/${userData?.attributes.profilePhoto[0]}`,
  //   name: `${userData?.firstName} ${userData?.lastName}`,
  //   email: userData?.email,
  //   status: f("approved"),
  //   verify: "verified",
  //   documents: "approved",
  // };

  // const postDataToChange = {
  //   category: data && data.result.data?.category,
  //   title: data && data.result.data?.title,
  //   description: data && data.result.data?.description,
  //   type: data && data.result.data?.type,
  //   week: data && data.result.data?.week,
  // };
  // const postDataToDisplay = [
  //   {
  //     col1: "Updated At",
  //     col2: data && data.result.data?.updated_at,
  //   },
  //   {
  //     col1: "created_at",
  //     col2: data && data.result.data?.created_at,
  //   },

  //   {
  //     col1: "user_id",
  //     col2: data && data.result.data?.user_id,
  //   },
  // ];
  const handelUpdateAdvice = () => {
    updateAdvice(AdviceInfo)
      .then((res) => {
        //  setAdviceInfo(res.result.data);
        toast.success("Conseil mis à jour avec succés !");
      })
      .catch((error) => {
        toast.error(`Erreur lors de la mise à jour d'un conseil!\n${error.message}`);
      });
  };
  const handleClose = () => {
    console.log("AdviceInfo2", AdviceInfo);
  };

  return (
    <>
      <Grid container direction="row" alignItems="baseline" p={2}>
        <Grid p={1} item xs={12} sm={12} md={6} lg={6}>
          <Title>{f("Données d'un  conseil")}</Title>
          <Grid item xs={12} sm={12}>
            <TextField
              xs={6}
              fullWidth
              rows={2}
              type="text"
              name="category"
              value={AdviceInfo.category}
              onChange={handleChange}
              id="invoice-note"
              placeholder="Categorie d'un conseil"
            />
          </Grid>
          <br />

          <Grid item xs={12} sm={12}>
            <TextField
              xs={6}
              fullWidth
              rows={2}
              type="text"
              name="description"
              value={AdviceInfo.description}
              onChange={handleChange}
              id="invoice-note"
              placeholder="Description d'un conseil"
            />
          </Grid>
          <br />
          <Grid item xs={12} sm={12}>
            <TextField
              xs={6}
              fullWidth
              rows={2}
              type="text"
              name="title"
              value={AdviceInfo.title}
              onChange={handleChange}
              id="invoice-note"
              placeholder="Titre d'un conseil"
            />
          </Grid>
          <br />
          <Grid item xs={12} sm={12}>
            <TextField
              xs={6}
              fullWidth
              rows={2}
              type="text"
              name="type"
              value={AdviceInfo.type}
              onChange={handleChange}
              id="invoice-note"
              placeholder="description of classroom"
            />
          </Grid>

          <br />
          <Grid item xs={12} sm={12}>
            <TextField
              xs={6}
              fullWidth
              rows={2}
              type="text"
              name="week"
              value={AdviceInfo.week}
              onChange={handleChange}
              id="invoice-note"
              placeholder="description of classroom"
            />
          </Grid>
          <br />
          <Grid item xs={12} sm={12}>
            <TextField
              xs={6}
              fullWidth
              rows={2}
              type="text"
              name="category"
              value={AdviceInfo.created_at}
              onChange={handleChange}
              id="invoice-note"
              disabled
              placeholder="Date de creation d'un conseil"
            />
          </Grid>
          <br />
          <Grid item xs={12} sm={12}>
            <TextField
              xs={6}
              fullWidth
              rows={2}
              type="text"
              disabled
              name="updated_at"
              value={AdviceInfo.updated_at}
              onChange={handleChange}
              label=""
              id="invoice-note"
              placeholder="Date de mise à jour d'un conseil"
            />
          </Grid>
          <br />
          <Grid item xs={12} sm={12}>
            <Button
              size="medium"
              variant="contained"
              onClick={handelUpdateAdvice}
            >
              Confirmer
            </Button>
            <Button
              size="medium"
              variant="contained"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>

        {/* <Grid p={1} item xs={12} sm={12} md={6} lg={6}>
          <Grid mb={3} item direction="column">
            <Title>{f("Image")}</Title>
            <img
              src={`${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/${data?.image}`}
              alt="post"
              className={styles.img}
              onError={({ currentTarget }) => {
                // eslint-disable-next-line no-param-reassign
                currentTarget.onerror = null;
                // eslint-disable-next-line no-param-reassign
                currentTarget.src = `${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/7d1941599943312616c9d54fa571bf88`;
              }}
            />
          </Grid>
        </Grid> */}
      </Grid>
    </>
  );
}
export default Post;
