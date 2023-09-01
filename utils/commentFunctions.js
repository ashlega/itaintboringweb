import React, { useMemo, useState, useEffect } from "react";

const addCommentApi = `/api/comment`
const getCommentListApi = `/api/commentlist`

export async function addNewComment(requestid, details) {
    const response = await fetch(addCommentApi,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            details: details,
            requestid: requestid
        }),
    });
    const data = await response.json()
	return data;
}

export async function getCommentList(requestid) {
    const response = await fetch(getCommentListApi+"?requestid="+requestid, { cache: 'force-cache'});
    const data = await response.json()
	return data;
}




