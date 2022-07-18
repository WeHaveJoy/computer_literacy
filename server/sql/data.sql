-- #LEVEL1

insert into courses_beginners(description, img, level) values ('A mouse is an input device that allows the user to move a pointer displayed on the monitor and experience a more intuitive interaction with computer systems.
.These days mouse have more buttons than the common three.
However, the three main buttons allow the user to select, grab, scroll and access extra menus and options.
A computer mouse is a handy pointing device can be wired or wireless. The latter obviously requires batteries.', 'mouse.jpeg', '1');

insert into courses_beginners(description, img, level) values ('This is the part that holds all of the parts of a computer to make up the computer system.
It is usually designed in such a manner to make fitting a motherboard, wiring, and drives as easy as possible. Some are designed so well that it is easy to make everything look tidy and presentable too.
Cases come in all different sizes and shapes to accommodate various types of computer components and satisfy the consumer’s needs.', 'computer box.jpeg', '1');

insert into courses_beginners(description, img, level) values ('A monitor is an output device used to visualize the graphics data sent from the computer’s GPU.
There are various types of monitors on the market. A LED (Light Emitting Diode) backlit LCD (Liquid Crystal Display) monitor is the most commonly used with modern computers.', 'monitor.jpeg', '1');

insert into courses_beginners(description, img, level) values ('RAM or random access memory is a data storage device that can provide fast read and write access. RAM is volatile memory, meaning it loses all the stored data when power is lost.The RAM keeps data ready for the CPU to process. The RAM speed is a big contributor to the overall speed of a computer system.
It plugs directly into a long slot that has contacts on either side of the slot.
It, too, has a clock speed, just like a processor. So, it can also be overclocked to deliver increased performance beyond the intended specification.
', 'RAM.jpeg', '1');

insert into courses_beginners(description, img, level) values ('USB stands for “Universal Serial Bus“, and it is very versatile in use. USB ports are used for many objectives like as to exchange data, connect peripheral devices (printers, keyboards, external hard drives, mice, scanners), as well as interface for charging devices like as smart phones, digital cameras, etc.', 'USB port.jpeg', '1');

insert into courses_beginners(description, img, level) values ('HDMI cables are the primary way to connect devices to a TV or home theatre set-up or other external devices like the projector. HDMI cables can pass video, and audio.', 'HDMI-cable.jpeg', '1');

insert into courses_beginners(description, img, level) values ('Ethernet port was used to connect network device with computer through wired connection. If, cable is plugged one time into Ethernet port, then it is able to deal with cable modem, network hub, an Internet gateway or DSL modem. Mostly, computers are built with an Ethernet port, if any time it gets to halt, then adapter card can alter its integrating.', 'Ethernet Port.jpeg', '1');

insert into courses_beginners(description, img, level) values ('The Central Processing Unit(CPU) or central processing unit is basically like the brain of computer systems. It processes all the information on a computational level.
It takes all the processes from the RAM and processes it to perform the tasks required by the computer system.', 'CPU.jpeg', '1');

insert into courses_beginners(description, img, level) values ('A computer fan is any fan inside, or attached to, a computer case used for active cooling. Fans are used to draw cooler air into the case from the outside, expel warm air from inside and move air across a heat sink to cool a particular component.', 'Fan.jpeg', '1');

insert into courses_beginners(description, img, level) values ('A keyboard is an input device that is one of the ways to communicate with a computer. Typing a key from the keyboard sends a small portion of data to tell the computer which key was pressed.', 'keyboard.jpeg', '1');

insert into courses_beginners(description, img, level) values ('The motherboard is the main board that is screwed directly inside the computer case. All other cards and everything else plugs directly into the motherboard, hence its name.
The CPU, RAM, drives, power supply, and more are connected to it.
Its function involves integrating all the physical components to communicate and operate together.', 'computer-motherboard.jpeg', '1');

insert into courses_beginners(description, img, level) values ('HDMI stands for “High Definition Media Interface“, and it is digital interface that is used to make connection with high and ultra definition devices such as monitor, gaming consol, HDTVs, ultra definition cameras, etc. it is capable to carry uncompressed video and uncompressed or compressed audio signals.', 'hdmi port.jpeg', '1');


-- #LEVEL3

insert into courses_beginners(description, img, level) values ('***SELECT AND HIGHLIGHT
Click or tap once, and hold to start your selection. Then, drag your cursor or finger and notice how the characters on your screen are highlighted. Release when you are done selecting your text.', 'highlighting.png', '3');

insert into courses_beginners(description, img, level) values ('**HOW TO CREATE FOLDER
1. In the desktop, click or tap the File Explorer button on the taskbar.
2.Open the drive or folder where you want to create a folder.
3.Click or tap the New Folder button on the Home tab.
4.Right-click or tap-hold a blank area of the window, point to New, and then click or tap New folder.
5.With the New Folder name selected, type a new name.
6. Press Enter or tap in a blank area.', 'folder.png', '3');

insert into courses_beginners(description, img, level) values ('A computer mouse is a handheld hardware input device that controls a cursor in a GUI (graphical user interface) for pointing, moving and selecting text, icons, files, and folders on your computer.', 'mouse_demo.png', '3');

insert into courses_beginners(description, img, level) values ('Put the mouse pointer over the file or folder.
Press and hold mouse button 1.
Drag the icon to where you want to drop it.
Release the mouse button on the path you want to paste the item
', 'drag&drop.png');

insert into courses_beginners(description, img, level) values ('*****How to launch and run various applications
Click a tile in the Start menu.
Open the Start menu and click the All Apps button in the lower-left corner. This displays an alphabetical list of installed apps (as shown in the following figure). Click an app to open it.
Double-click a program shortcut icon on the desktop (see the following figure).
Click an item on the desktop taskbar to display a currently open program. The taskbar should display by default. If it doesn't, press the Windows key (on your keyboard) to display it, and then click an icon on the taskbar.
When the application opens, if it's a game, play it; if it's a spreadsheet, enter numbers into it; if it's your email program, start deleting junk mail . ', '', '3');


-- #LEVEL2


-- assessment

insert into assessment(description) values('Mouse level1');
insert into assessment(description) values('CPU level1');
insert into assessment(description) values('Keyboard level1');
insert into assessment(description) values('Motherboard level1');
insert into assessment(description) values('RAM level1');
-- insert into assessment(description) values(' level1');

--questions

insert into questions(question) values ('A mouse is a/an _____.');
insert into questions(question) values ('CPU stands for?');
insert into questions(question) values ('A keyboard has _____ keys.');
insert into questions(question) values ('The chip/chips present on the motherboard is/are');
insert into questions(question) values ('The computer is beeping constantly after you have booted it. What is the likely problem?');

--answers

insert into answers(answer, correct) values('Input device', 'True');
insert into answers(answer, correct) values('Output device', 'False');
insert into answers(answer, correct) values('Processing device', 'False');
insert into answers(answer, correct) values( 'All of the above', 'False');

insert into answers(answer, correct) values('Control Processing Unit', 'False');
insert into answers(answer, correct) values('Central Programming Unit', 'False');
insert into answers(answer, correct) values('Central Processing Unit', 'True');
insert into answers(answer, correct) values('Control Programming Unit', 'False');

insert into answers(answer, correct) values('Both', 'True');
insert into answers(answer, correct) values('Number', 'False');
insert into answers(answer, correct) values('Alphabets', 'False');

insert into answers(answer, correct) values('RAM', 'False');
insert into answers(answer, correct) values('ROM', 'False');
insert into answers(answer, correct) values('MICR', 'False');
insert into answers(answer, correct) values('Both (RAM & ROM)', 'True');

insert into answers(answer, correct) values('CPU', 'False');
insert into answers(answer, correct) values('Registry', 'False');
insert into answers(answer, correct) values('RAM', 'True');
insert into answers(answer, correct) values('Power supply', 'False');


