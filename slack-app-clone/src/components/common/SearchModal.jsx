import React from 'react'

const SearchModal = () => {
  return (
    <>
    <input type="checkbox" id="search-modal" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box relative">
            <div className="p-2 flex flex-row gap-2 border-b">
                <input placeholder="Search" className="rounded h-8 w-full focus:outline-none"/>
                <label htmlFor="search-modal" className="cursor-pointer">✕</label>
            </div>
            <div className="rounded my-2 relative pin-t pin-l ">
                <ul className="list-reset">
                    <li><p className="p-2 block text-black hover:bg-grey-light cursor-pointer hover:text-primary">
                        one@email.com
                        <svg className="float-right" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z"/></svg>
                    </p></li>
                    <li><p className="p-2 block text-black hover:bg-grey-light cursor-pointer hover:text-primary">two@email.com</p></li>
                </ul>
        </div>
        </div>
    </div>
    </>
  )
}

export default SearchModal