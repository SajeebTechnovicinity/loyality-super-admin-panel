export default function Form() {
    return (
        <div className='dashboard-content'>
            <div className='dashboard-content__topbar topbar flex-ctr'>
                <div className='drawer-open'>
                    <span className='slice-top'></span>
                    <span className='slice-middle'></span>
                    <span className='slice-bottom'></span>
                </div>
            </div>
            <div className='dashboard-content__title-bar title-bar'>
                <h3 className='title'>Dashboard</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <form action='#' className='default-form'>

                        <div className='form-row col-2'>
                            <div className='from-field'>
                                <label>Field Name</label>
                                <input
                                    className='from-element from-element-text'
                                    type='text'
                                />
                            </div>
                            <div className='from-field'>
                                <label>Field Name</label>
                                <input
                                    className='from-element from-element-text'
                                    type='text'
                                />
                            </div>
                        </div>

                        <div className='form-row col-3'>
                            <div className='from-field'>
                                <label>Field Name</label>
                                <input
                                    className='from-element from-element-file'
                                    type='file'
                                />
                            </div>
                            <div className='from-field'>
                                <label>Field Name</label>
                                <input
                                    className='from-element from-element-text'
                                    type='text'
                                />
                            </div>
                            <div className='from-field'>
                                <label>Field Name</label>
                                <input
                                    className='from-element from-element-text'
                                    type='text'
                                />
                            </div>
                            <div className='from-field'>
                                <label>Field Name</label>
                                <input
                                    className='from-element from-element-text'
                                    type='text'
                                />
                            </div>
                            <div className='from-field'>
                                <label>Field Name</label>
                                <textarea className='from-element from-element-textarea'></textarea>
                            </div>
                            <div className='from-field'>
                                <label>Field Name</label>
                                <div className="select-wrap">
                                    <select name="" id="" className="from-element from-element-select">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='form-submit'>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
