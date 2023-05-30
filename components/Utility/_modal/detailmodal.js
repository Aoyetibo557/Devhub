import React, { useState, useEffect} from 'react'
import Modal from "../_modal/modal";
import { BiGitRepoForked } from 'react-icons/bi'
import { BsEye, BsStar } from 'react-icons/bs'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { convertToRelativeTime }   from "../../../lib/utils/formatdate";
import Link from "next/link"
import {Tag} from "antd";
import { CommitCard } from "../../_commitcard/commitcard";


const branchcolors = {
    "master": "bg-red-700 ",
    "main": "bg-blue-700",
    "develop": "bg-blue-700",
    "dev": "bg-blue-700",
    "staging": "bg-purple-700",
    "other": "bg-orange-700"
}

const DetailModal = ({leftSideContent, rightSideContent, open, setOpen, repo, }) => {
    const [repoCommits, setRepoCommits] = useState([])

   useEffect(() => {
       const getRepoCommits = async () => {
              try{
                const res = await fetch(`https://api.github.com/repos/${repo.owner?.login}/${repo.name}/commits?order=desc`)
                const data = await res.json()
                setRepoCommits(data)
              }catch(err) {
                console.log(err)
              }
         }
            getRepoCommits()

   }, [repo?.name])

    return (
        <Modal
            open={true}
            setOpen={setOpen}
            title={
                <div className={`flex flex-col justify-between h-full`}>
                    <div>
                        <div className={`flex flex-row items-center gap-4 border-b-[0.9px] border-gray-300 p-2`}>
                            <img src ={repo.owner?.avatar_url} className={`object-cover rounded-full  border-[1px] shadow-sm border-gray-300 w-12 h-12`} />
                            <div className={`text-base font-medium text-gray-700`}>
                                {repo?.full_name}
                            </div>
                            <div>
                                <Tag className={`text-xs text-white font-medium 
                                    ${branchcolors[repo.default_branch] || branchcolors["other"] }
                                `}>
                                    {repo.default_branch}
                                </Tag>
                                {repo?.private ?(
                                    <Tag className={`text-xs font-medium text-gray-600`}>
                                        Private
                                    </Tag>
                                ):(
                                    <Tag className={`text-xs font-medium text-gray-600`}>
                                        Public
                                    </Tag>
                                )}
                                
                            </div>
                        </div>
                        <div>
                            <div title={`Repository Description: ${repo.description}`} className={`p-3 flex flex-col gap-2 text-xs font-normal `}>
                                <span className={`text-xs text-gray-500`}>
                                    Description:
                                </span>
                                <span className={` text-sm text-gray-600`}>
                                    { repo.description || "No description provided"}
                                </span>
                            </div>

                            <div className={`p-3 flex flex-col`}>
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
                        </div>
                    </div>

                    <div>
                        
                    
                        <div className={`flex flex-row items-center justify-between border-b-[1px] p-2 border-gray-300`}>
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
                               <Link title={`View Repo - ${repo.html_url}`} href={repo.html_url} target="_blank" className={`cursor-pointer hover:scale-105 `}>
                                 <HiOutlineExternalLink className={`w-5 h-5 text-gray-700 hover:text-blue-600`} />
                                </Link>
                            </div>
                        </div>
                        <span className={`text-gray-500 text-xs`}>
                            Created {convertToRelativeTime(repo.created_at)}
                        </span>
                    </div>
                </div>
            }
        >
            <div className={`flex flex-col justify-between w-full h-full px-3  `}>
                <div>
                    <span className={`text-sm font-medium text-gray-700`}>
                        Git Commit History: ({repoCommits?.length})
                    </span>
                </div>
                <div className={`flex flex-col flex-wrap justify-between overflow-auto `}>
                  {repoCommits.length > 0 ? (
                       <div>
                         {repoCommits.map((commit, index) => (
                            <CommitCard key={index} commit={commit} />
                         ))}
                       </div>
                  ) : (
                        <div className={`text-sm font-medium text-gray-700`}>
                            No commits found!
                        </div>
                  )}
                </div>

              
            </div>

        </Modal>
    )
}

export default DetailModal