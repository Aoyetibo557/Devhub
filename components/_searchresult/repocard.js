import React, { useState, useEffect } from 'react'
import { BiGitRepoForked } from 'react-icons/bi'
import { BsEye, BsStar } from 'react-icons/bs'
import { truncate } from '../../lib/utils/useTruncate'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { convertToRelativeTime }   from '../../lib/utils/formatdate';
import DetailModal from "../Utility/_modal/detailmodal"


export const RepoCard = (repo) => {
    const [showModal, setShowModal] = useState(false);

    return(
        <div className={`flex flex-col justify-between w-72 h-80 bg-white border-[1px] rounded-lg border-gray-200 shadow-sm p-2 m-4 cursor-pointer hover:scale-105 transition-ease-in-out duration-200 `} onClick={() => setShowModal(true)} >
            <div className={`flex flex-col justify-between `}>
                <img title="Reposistory Image" src={`${repo.owner?.avatar_url}`} className={`object-cover rounded-lg w-full h-20 peer-hover:h-32 `} />
                <div title={`Repository Name - ${repo.name}`} className={`mt-2 text-sm font-medium text-gray-700`}>
                    {repo.name} 
                </div>
            </div>
            <div title={`Repository Description: ${repo.description}`} className={`flex flex-col text-xs font-normal `}>
                <span className={`text-xs text-gray-500`}>
                    Description:
                </span>
               <span className={` text-sm text-gray-600`}>
                 { truncate(repo.description)
                 || "No description provided"}
               </span>
            </div>

            <div className={`flex flex-col`}>
                <span className={`text-xs text-gray-500`}>
                    Language(s):
                </span>
                {repo.language ? (
                    <span title={`Repository Language: ${repo.language}`} className={`text-xs font-medium text-gray-600`}>
                        {repo.language}
                    </span>
                ): (
                     <span className={` text-xs text-gray-600`}>
                        Not Specified
                     </span>
                )}
            </div>

            <div>
               <span className={`text-gray-500 text-xs`}>
                 Created {convertToRelativeTime(repo.created_at)}
               </span>
           
                <div className={`flex flex-row items-center justify-between border-t-[1px] p-2 border-gray-600`}>
                    <div className={`flex flex-row items-center justify-center gap-3`}>
                    <span title={`${repo.stargazers_count} Stars`} className={`text-sm text-gray-600 flex flex-row items-center justify-center gap-2`}>
                        <BsStar className={`cursor-pointer w-4 h-4 text-gray-700`} /> 
                        { repo.stargazers_count}
                    </span>
                        <span title={`${repo.forks} Forks`} className={`text-sm text-gray-600 flex flex-row items-center justify-center gap-2`}>
                            <BiGitRepoForked className={`cursor-pointer w-4 h-4 text-gray-700`} /> 
                            {repo.forks}
                        </span>
                    
                    </div>
                    <div className={`flex flex-row items-center justify-center gap-1`}>
                        <HiOutlineExternalLink className={`w-5 h-5 text-gray-700`} />
                    </div>
                </div>
             </div>

             {showModal && (
                <DetailModal open={showModal} setOpen={setShowModal} repo={repo} />
            )}
        </div>
    )
}