
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Module from "./Module";
import "./CourseBuilder.css";
import { FaPlus } from "react-icons/fa";
import image_land from "./landing-image.jpg";

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleAddModule = () => {
    if (moduleName.trim() === "") return;
    const newModule = {
      id: `module-${Date.now()}`,
      title: moduleName,
      resources: [],
    };
    setModules([...modules, newModule]);
    setFeedbackMessage("Module added");
    setTimeout(() => setFeedbackMessage(""), 3000);
    setShowPopup(false); 
    setModuleName(""); 
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(modules);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setModules(items);
    } else {
      const sourceModuleIndex = modules.findIndex(
        (module) => module.id === source.droppableId
      );
      const destModuleIndex = modules.findIndex(
        (module) => module.id === destination.droppableId
      );
      const sourceModule = modules[sourceModuleIndex];
      const destModule = modules[destModuleIndex];
      const sourceResources = Array.from(sourceModule.resources);
      const destResources = Array.from(destModule.resources);
      const [movedResource] = sourceResources.splice(source.index, 1);
      destResources.splice(destination.index, 0, movedResource);
      const newModules = Array.from(modules);
      newModules[sourceModuleIndex] = {
        ...sourceModule,
        resources: sourceResources,
      };
      newModules[destModuleIndex] = { ...destModule, resources: destResources };
      setModules(newModules);
    }
  };

  return (
    <div className="course-builder">
      <h1>Course Builder✍️</h1>
      <button className="add-module" onClick={handleTogglePopup}>
        <FaPlus className="fa-plus" style={{ marginRight: "8px" }} /> Add 🔗
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create New Module 🗃️</h2>
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              placeholder="Module name"
            />
             <div class="btn-container">
            <button className="cacmodule" onClick={handleAddModule}>Create</button>
            <button className="cacmodule" onClick={handleTogglePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {feedbackMessage && <div className="feedback">{feedbackMessage}</div>}
      {modules.length === 0 && (
        <div className="placeholder-image">
          <img src={image_land} alt="Placeholder" />
        </div>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-modules" type="module">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {modules.map((module, index) => (
                <Draggable
                  key={module.id}
                  draggableId={module.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Module
                        module={module}
                        setModules={setModules}
                        modules={modules}
                        setFeedbackMessage={setFeedbackMessage}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CourseBuilder;
