import React, { useState, useEffect } from 'react'
import { convertToRelativeTime }  from '../../lib/utils/formatdate';


export const CommitCard = ({commit}) => {

    return (
        <div className={`flex flex-col justify-between w-72 h-80 bg-white border-[1px] rounded-lg border-gray-200 shadow-sm p-2 m-4 cursor-pointer hover:scale-105 transition-ease-in-out duration-200 `} >
            <div className={`flex flex-col justify-between `}>
                <div title={`Commit Message - ${commit.commit.message}`} className={`mt-2 text-sm font-medium text-gray-700`}>
                    {commit.commit.message}
                </div>

                <div className={`flex flex-col`}>
                    <span className={`text-xs text-gray-500`}>
                        {commit.commit.author.name}
                    </span>
                </div>

                <div>
                    <span className={`text-gray-500 text-xs`}>
                        {convertToRelativeTime(commit.commit.author?.date)}
                    </span>
                </div>
            </div>
        </div>
    )
}